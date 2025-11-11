# Backend - Gestión Alquiler de Autos

Sistema backend usando **Node.js**, **Express** y **MySQL** con **Sequelize**.

---

## 1️⃣ Configuración inicial

1. Clonar el repositorio:

2. Crear .env en la raíz con tus credenciales locales:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=alquiler_autos

3. Instalar dependencias:

npm install


## 2️⃣ Crear la base de datos

node createDatabase.js

    Esto creará la base alquiler_autos si no existe.

## 3️⃣ Migraciones

Ejecutar todas las migraciones para crear las tablas:

npx sequelize-cli db:migrate

    Esto generará Usuarios, Marcas, Autos, Clientes y Alquileres según las migraciones del repo.


## 4️⃣ Levantar servidor

npm run dev

    Por defecto corre en http://localhost:3000
# EFI-Prg3-back
