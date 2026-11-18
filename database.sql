-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS cafe_db;
USE cafe_db;

-- 2. Crear tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un Administrador por defecto (Contraseña encriptada para 'admin123')
-- Nota: La contraseña en texto plano es admin123, pero en BD se guarda el Hash de bcrypt
INSERT IGNORE INTO usuarios (nombre, correo, password, rol) 
VALUES ('Administrador Principal', 'admin@cafe.com', '$2b$10$Z/EssiaPaD.YEULDRYV9G.wTfwcyob8fagqCtxNCsI9pcoN1RhQd6', 'admin');

-- Usuarios utilizados por los datos de ventas simulados
INSERT IGNORE INTO usuarios (id, nombre, correo, password, rol) VALUES
(2, 'Cliente Uno', 'cliente1@cafe.com', '$2b$10$Z/EssiaPaD.YEULDRYV9G.wTfwcyob8fagqCtxNCsI9pcoN1RhQd6', 'cliente'),
(3, 'Cliente Dos', 'cliente2@cafe.com', '$2b$10$Z/EssiaPaD.YEULDRYV9G.wTfwcyob8fagqCtxNCsI9pcoN1RhQd6', 'cliente'),
(4, 'Cliente Tres', 'cliente3@cafe.com', '$2b$10$Z/EssiaPaD.YEULDRYV9G.wTfwcyob8fagqCtxNCsI9pcoN1RhQd6', 'cliente');

-- 3. Crear tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    categoria ENUM('cafe', 'frappe', 'postre') NOT NULL,
    stock INT DEFAULT 10
);

-- 4. Inserts de Productos (Tomados de tu datosMenu.js)

-- ==================== CAFÉS ====================
INSERT IGNORE INTO productos (id, nombre, descripcion, precio, imagen, categoria, stock) VALUES
('c1', 'Espresso Americano', 'Preparado con shots de espresso de café premium 100% arábigo y agua caliente para un sabor intenso y reconfortante.', 58.00, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400', 'cafe', 50),
('c2', 'Caffè Latte', 'Shots de espresso premium combinados con leche vaporizada y una delicada capa de espuma de leche encima.', 69.00, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400', 'cafe', 35),
('c3', 'Cappuccino Tradicional', 'Una rica base de espresso mezclada en partes iguales con leche vaporizada y una abundante y cremosa espuma de leche.', 69.00, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400', 'cafe', 40),
('c4', 'Caramel Macchiato', 'Leche vaporizada con jarabe de vainilla, marcada con shots de espresso premium y decorada con nuestro característico dibujo de caramelo.', 78.00, 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400', 'cafe', 25),
('c5', 'Café Mocha Blanco', 'Espresso combinado con nuestra salsa de chocolate blanco premium, leche vaporizada y cubierto con deliciosa crema batida.', 79.00, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400', 'cafe', 20),
('c6', 'Flat White', 'Una bebida suave y cremosa que consiste en shots de Ristretto cortos e intensos, terminados con una suave capa de leche vaporizada.', 72.00, 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400', 'cafe', 15);

-- ==================== FRAPPÉS ====================
INSERT IGNORE INTO productos (id, nombre, descripcion, precio, imagen, categoria, stock) VALUES
('f1', 'Caramel Frappuccino®', 'Café mezclado con hielo, leche y delicioso jarabe de caramelo, cubierto con una espiral de crema batida y un toque extra de caramelo.', 85.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400', 'frappe', 30),
('f2', 'Mocha Frappuccino®', 'Nuestra salsa de chocolate premium mezclada con café, leche entera y hielo, terminada con crema batida para los amantes del chocolate.', 85.00, 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400', 'frappe', 25),
('f3', 'Matcha Green Tea Frappuccino®', 'Una mezcla premium de té verde matcha japonés dulce, leche entera, hielo y crema batida para una vibrante experiencia refrescante.', 89.00, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400', 'frappe', 15),
('f4', 'Strawberries & Cream Frappuccino®', 'Deliciosa salsa de fresas con leche y hielo batido, terminado con una generosa nube de crema batida y un toque frutal irresistible.', 87.00, 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400', 'frappe', 20),
('f5', 'Java Chip Frappuccino®', 'Chispas de chocolate crujientes batidas con café, leche entera, hielo y salsa de chocolate, cubierto con crema batida y espiral de mocha.', 89.00, 'https://images.unsplash.com/photo-1626264489332-b0724823a633?auto=format&fit=crop&q=80&w=400', 'frappe', 18),
('f6', 'Cookies & Cream Frappuccino®', 'Exquisita combinación de galletas de chocolate crujientes trituradas y mezcladas con crema batida, leche vaporizada y hielo.', 86.00, 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=400', 'frappe', 22);

-- ==================== POSTRES ====================
INSERT IGNORE INTO productos (id, nombre, descripcion, precio, imagen, categoria, stock) VALUES
('p1', 'Cheesecake con Frambuesa', 'Una suave y cremosa base de pay de queso estilo Nueva York montada sobre galleta crujiente, terminada con una deliciosa mermelada de frambuesa.', 65.00, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400', 'postre', 10),
('p2', 'Pastel de Chocolate Premium', 'Tres deliciosas y húmedas capas de pastel de chocolate amargo, rellenas y cubiertas con un cremoso fudge de chocolate.', 68.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400', 'postre', 8),
('p3', 'Croissant de Mantequilla', 'Clásico pan francés hojaldrado elaborado con capas de mantequilla premium, horneado al momento para ofrecer una textura crujiente y dorada.', 42.00, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', 'postre', 15),
('p4', 'Muffin de Blueberries', 'Esponjoso panecillo horneado repleto de moras azules frescas de temporada y decorado con un toque crujiente de azúcar en la parte superior.', 46.00, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=400', 'postre', 12),
('p5', 'Dona Glaseada', 'Suave dona con una textura esponjosa y ligera, cubierta por una fina capa de glaseado dulce tradicional que se derrite en tu boca.', 38.00, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400', 'postre', 20),
('p6', 'Cinnamon Roll', 'Exquisito rollo de canela recién horneado con un toque de azúcar mascabado, cubierto con un cremoso glaseado de queso crema.', 52.00, 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400', 'postre', 14);

-- Fin del script

-- 5. Crear tabla de Ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 6. Insertar Datos de Ventas Simulados
INSERT IGNORE INTO ventas (usuario_id, producto_id, cantidad, precio_total, fecha) VALUES
(1, 'c1', 12, 696.00, '2026-05-10 08:30:00'),
(2, 'c2', 8, 520.00, '2026-05-11 09:15:00'),
(1, 'c3', 15, 1020.00, '2026-05-12 10:00:00'),
(3, 'c4', 7, 525.00, '2026-05-14 11:45:00'),
(4, 'f1', 22, 1870.00, '2026-05-15 15:30:00'),
(2, 'f2', 14, 1260.00, '2026-05-16 16:20:00'),
(1, 'f3', 19, 1710.00, '2026-05-17 17:10:00'),
(3, 'f6', 11, 1045.00, '2026-05-18 14:05:00'),
(1, 'p1', 9, 612.00, '2026-05-19 12:30:00'),
(2, 'p2', 13, 975.00, '2026-05-20 13:40:00'),
(4, 'p3', 25, 1050.00, '2026-05-21 08:15:00'),
(1, 'p6', 17, 884.00, '2026-05-22 10:50:00'),
(2, 'c1', 5, 290.00, '2026-05-23 09:00:00'),
(3, 'c3', 6, 408.00, '2026-05-24 10:30:00'),
(1, 'f1', 8, 680.00, '2026-05-25 15:00:00'),
(4, 'p1', 4, 272.00, '2026-05-26 11:20:00'),
(2, 'p3', 10, 420.00, '2026-05-27 08:45:00');

