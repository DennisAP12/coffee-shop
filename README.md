# Starbucks Vibes

Aplicación web responsive para una cafetería con catálogo, carrito, autenticación, ventas e inventario administrativo.

## Requisitos

- Node.js 20 o superior
- MySQL 8
- npm

## Instalación

Desde la raíz del proyecto:

```powershell
npm install
cd backend
npm install
Copy-Item .env.example .env
```

Edita `backend/.env` con tus credenciales locales de MySQL.

Importa la base de datos desde MySQL:

```powershell
cd ..
mysql -u root -p < database.sql
```

## Ejecutar

Backend:

```powershell
cd backend
npm run dev
```

Frontend, desde otra terminal:

```powershell
cd ..
npm run dev
```

URLs:

- Frontend: http://localhost:5173
- API: http://localhost:3000

Administrador de prueba:

- Correo: admin@cafe.com
- Contraseña: admin123

## Compilación

```powershell
npm run build
```
