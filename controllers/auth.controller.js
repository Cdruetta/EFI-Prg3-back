const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { User } = require("../models");
const { sendEmail } = require("../utils/nodemailer");

// =========================
// LOGIN
// =========================
const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await User.findOne({ where: { correo } });

    if (!user) {
      console.warn("⚠️ [LOGIN] Usuario no encontrado:", correo);
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Verifica password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn("⚠️ [LOGIN] Contraseña incorrecta para:", correo);
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Genera token
    const token = jwt.sign(
      { sub: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("❌ [LOGIN] Error en el login:", error);
    res.status(500).json({
      status: 500,
      message: "Error en el login",
      error: error.message,
    });
  }
};

// =========================
// PERFIL DE USUARIO (ME)
// =========================
const me = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.warn("⚠️ [ME] No se proporcionó token");
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.sub, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("❌ [ME] Error en /me:", err.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

// =========================
// RECUPERAR CONTRASEÑA
// =========================
const resetTokens = new Map();

const resetEmailTemplate = ({ nombre, resetUrl }) => {
  return `
    <div style="max-width: 520px; margin:0; padding: 20px;">
        <h2>Recupera tu contraseña</h2>
        <p>Hola ${nombre || ''}, recibimos tu solicitud para restablecer la contraseña.</p>
        <p>Hace click en el boton para continuar.</p>
        <p>
            <a href=${resetUrl}>
                Cambiar contraseña
            </a>
        </p>
        <p>Si no fuiste vos, podes ignorar el mensaje</p>
    </div>
    `;
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { correo: email } });
    if (!user) {
      console.warn("⚠️ [FORGOT PASSWORD] Usuario no existe:", email);
      return res.status(400).json({ message: "No existe el usuario" });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000;

    resetTokens.set(user.id, { tokenHash, expiresAt });

    const resetUrl = `${process.env.FRONTEND_URL}/recuperar-contraseña?token=${rawToken}&id=${user.id}`;

    await sendEmail({
      to: user.correo,
      subject: 'Recuperar contraseña',
      html: resetEmailTemplate({ nombre: user.nombre, resetUrl }),
    });

    return res.status(201).json({ message: 'Email enviado correctamente' });
  } catch (error) {
    console.error("❌ [FORGOT PASSWORD] Error:", error);
    return res.status(500).json({ message: 'Error al enviar el mail', error: error.message });
  }
};

// =========================
// RESETEAR CONTRASEÑA
// =========================
const resetPassword = async (req, res) => {
  const { id, token, password } = req.body;

  if (!id || !token || !password)
    return res.status(400).json({ message: "Faltan datos" });

  try {
    const entry = resetTokens.get(Number(id));
    if (!entry) {
      console.warn("⚠️ [RESET PASSWORD] Token inválido para ID:", id);
      return res.status(400).json({ message: "El token es invalido" });
    }

    if (entry.expiresAt < Date.now()) {
      console.warn("⚠️ [RESET PASSWORD] Token expirado para ID:", id);
      return res.status(400).json({ message: "El token está vencido" });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (tokenHash !== entry.tokenHash) {
      console.warn("⚠️ [RESET PASSWORD] Token hash no coincide para ID:", id);
      return res.status(400).json({ message: "El token es invalido" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      console.warn("⚠️ [RESET PASSWORD] Usuario no encontrado:", id);
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    resetTokens.delete(Number(id));

    return res.status(201).json({ message: "La contraseña se actualizó con éxito" });
  } catch (error) {
    console.error("❌ [RESET PASSWORD] Error:", error);
    return res.status(500).json({ message: 'Error al resetear el password', error: error.message });
  }
};

module.exports = { login, me, forgotPassword, resetPassword };
