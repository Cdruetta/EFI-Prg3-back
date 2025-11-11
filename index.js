require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const specs = require("./swagger/swagger.js");

const app = express();
const port = process.env.PORT || 3000;

// 🔵 Logs de configuración inicial

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}));

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// 🔵 Middleware para loguear cada request entrante
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// 📦 Rutas
const userRoutes = require('./routes/user.routes');
const clientRoutes = require('./routes/client.routes');
const brandRoutes = require('./routes/brand.routes');
const carRoutes = require('./routes/car.routes');
const rentalRoutes = require('./routes/rental.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/brand', brandRoutes);
app.use('/car', carRoutes);
app.use('/rentals', rentalRoutes);
app.use('/user', userRoutes);

// ✅ Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// 🚀 Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
