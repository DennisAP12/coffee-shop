# Starbucks Vibes

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**Starbucks Vibes** es una aplicación web full-stack para una cafetería moderna. Incluye catálogo responsive, carrito de compras, autenticación, registro de ventas, control de inventario y un panel administrativo diseñado para supervisar las operaciones del negocio en tiempo real.

Repositorio: https://github.com/DennisAP12/coffee-shop

---

## Vista general

El proyecto se divide en dos experiencias:

- **Clientes:** descubren el menú, revisan productos por categoría, agregan artículos al carrito y realizan una compra.
- **Administradores:** supervisan ingresos, ventas, inventario, clientes y perfil desde un panel protegido.

Las compras registradas mediante el API actualizan las ventas y el stock de productos en MySQL, por lo que los datos del panel administrativo representan la actividad real de la aplicación.

---

## Funcionalidades principales

### Experiencia pública

- Diseño responsive para computadora, tablet y celular
- Landing page con promociones y secciones de marca
- Menús separados de cafés, frappés y postres
- Búsqueda de productos mediante la API
- Indicadores de disponibilidad y stock bajo
- Estados de carga, error y producto agotado
- Navegación móvil con menú lateral
- Carrito persistente mediante `localStorage`
- Resumen de subtotal, impuestos y total
- Validación de cantidades según el inventario disponible

### Cuenta y compras

- Registro de usuarios
- Inicio de sesión con contraseña cifrada mediante bcrypt
- Autenticación mediante JWT
- Rutas protegidas para usuarios administradores
- Perfil editable
- Cambio opcional de contraseña
- Registro transaccional de compras
- Actualización automática del stock

### Panel administrativo

- Indicadores de ingresos totales
- Cantidad de productos vendidos
- Número de órdenes
- Total de clientes
- Valor estimado del inventario
- Productos con stock bajo
- Gráfica de productos más vendidos
- Tabla detallada de ventas
- Inventario con búsqueda y paginación
- Crear, editar y eliminar productos
- Exportación de inventario a CSV
- Generación de reportes en PDF
- Navegación independiente para resumen, inventario, ventas y perfil
- Actualización automática cada 15 segundos y al recuperar el foco

---

## Tecnologías utilizadas

| Área | Tecnologías |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7 |
| Formularios | Formik |
| Visualización | Recharts, React Data Table Component |
| Documentos | jsPDF, html2canvas |
| Backend | Node.js, Express 5 |
| Base de datos | MySQL 8 |
| Seguridad | bcrypt, JWT, CORS, dotenv |

---

## Arquitectura

```text
src/
├── components/       Componentes reutilizables
├── context/          Sesión y carrito
├── pages/            Vistas públicas y administrativas
├── styles/           Estilos por sección
└── utils/            Datos auxiliares

backend/
├── routes/           Rutas de autenticación, productos y ventas
├── db.js             Pool de conexiones MySQL
└── server.js         Configuración del servidor Express

database.sql          Esquema e información inicial
```

---

## Requisitos previos

- Node.js 20 o superior
- npm
- MySQL 8 o compatible
- Git

---

## Instalación local

### 1. Clonar el repositorio

```powershell
git clone https://github.com/DennisAP12/coffee-shop.git
cd coffee-shop
```

### 2. Instalar dependencias

Frontend:

```powershell
npm install
```

Backend:

```powershell
cd backend
npm install
```

### 3. Configurar variables de entorno

Desde `backend/` crea el archivo `.env` a partir del ejemplo:

```powershell
Copy-Item .env.example .env
```

Contenido de referencia:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=cafe_db
JWT_SECRET=una_clave_larga_y_segura
```

No subas el archivo `.env` ni compartas tus credenciales.

### 4. Crear la base de datos

Desde la raíz del proyecto:

```powershell
mysql -u root -p < database.sql
```

El script crea `cafe_db`, usuarios, productos, ventas y relaciones de base de datos.

### 5. Ejecutar el backend

En una terminal:

```powershell
cd backend
npm run dev
```

API disponible en: http://localhost:3000

### 6. Ejecutar el frontend

En otra terminal, desde la raíz:

```powershell
npm run dev
```

Aplicación disponible en: http://localhost:5173

---

## Usuarios de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@cafe.com` | `admin123` |
| Cliente | `cliente1@cafe.com` | `admin123` |
| Cliente | `cliente2@cafe.com` | `admin123` |
| Cliente | `cliente3@cafe.com` | `admin123` |

Las credenciales pueden cambiarse después de iniciar sesión desde el perfil correspondiente.

---

## API principal

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/auth/registro` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `PUT` | `/api/auth/perfil/:id` | Actualizar perfil |
| `GET` | `/api/productos` | Obtener todos los productos |
| `GET` | `/api/productos?categoria=cafe` | Filtrar productos por categoría |
| `POST` | `/api/productos` | Crear producto |
| `PUT` | `/api/productos/:id` | Actualizar producto |
| `DELETE` | `/api/productos/:id` | Eliminar producto |
| `GET` | `/api/ventas` | Obtener ventas |
| `GET` | `/api/ventas/resumen` | Obtener indicadores administrativos |
| `POST` | `/api/ventas` | Registrar una compra |

---

## Flujo de una compra

1. El cliente inicia sesión.
2. Selecciona productos y cantidades.
3. El frontend valida el stock disponible.
4. El backend inicia una transacción MySQL.
5. Se verifica el stock dentro de la transacción.
6. Se registran las ventas.
7. Se decrementa el inventario.
8. El panel recibe las nuevas cifras al actualizarse.

Si una venta supera el stock disponible o falla alguna operación, la transacción se cancela para mantener los datos consistentes.

---

## Scripts disponibles

### Frontend

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```powershell
npm start
npm run dev
```

---

## Verificación de compilación

```powershell
npm run build
```

La versión de producción se genera en `dist/`.

---

## Seguridad

- Contraseñas almacenadas como hash bcrypt
- Sesiones administradas mediante JWT
- Ruta administrativa protegida en frontend
- Credenciales locales fuera del control de versiones
- Validaciones de stock en frontend y backend
- Uso de transacciones SQL al registrar compras

Para un despliegue público deberían añadirse rate limiting, expiración estricta de sesiones, certificados HTTPS, políticas CORS específicas y autorización servidor-backend para todas las operaciones administrativas.

---

## Autor

**DennisAP12**

- GitHub: https://github.com/DennisAP12
- Repositorio: https://github.com/DennisAP12/coffee-shop

---

## Licencia

Este proyecto se distribuye bajo licencia MIT.
