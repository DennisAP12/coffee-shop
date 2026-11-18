/**
 * Datos dinámicos para la aplicación de Starbucks Vibes.
 * Aquí puedes cambiar los precios, descripciones e imágenes de los productos de forma centralizada.
 * 
 * NOTA PARA EL USUARIO:
 * Para actualizar las imágenes de los productos, simplemente reemplaza el valor de la propiedad 'imagen'
 * (por ejemplo, "https://via.placeholder.com/..." o "/imagnes/...") por el enlace o la ruta local de tu imagen.
 */

export const cafeProducts = [
  {
    id: 'c1',
    nombre: 'Espresso Americano',
    descripcion: 'Preparado con shots de espresso de café premium 100% arábigo y agua caliente para un sabor intenso y reconfortante.',
    precio: '$58.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CAFÉ AMERICANO
  },
  {
    id: 'c2',
    nombre: 'Caffè Latte',
    descripcion: 'Shots de espresso premium combinados con leche vaporizada y una delicada capa de espuma de leche encima.',
    precio: '$69.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE LATTE
  },
  {
    id: 'c3',
    nombre: 'Cappuccino Tradicional',
    descripcion: 'Una rica base de espresso mezclada en partes iguales con leche vaporizada y una abundante y cremosa espuma de leche.',
    precio: '$69.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CAPPUCCINO
  },
  {
    id: 'c4',
    nombre: 'Caramel Macchiato',
    descripcion: 'Leche vaporizada con jarabe de vainilla, marcada con shots de espresso premium y decorada con nuestro característico dibujo de caramelo.',
    precio: '$78.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CARAMEL MACCHIATO
  },
  {
    id: 'c5',
    nombre: 'Café Mocha Blanco',
    descripcion: 'Espresso combinado con nuestra salsa de chocolate blanco premium, leche vaporizada y cubierto con deliciosa crema batida.',
    precio: '$79.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE MOCHA BLANCO
  },
  {
    id: 'c6',
    nombre: 'Flat White',
    descripcion: 'Una bebida suave y cremosa que consiste en shots de Ristretto cortos e intensos, terminados con una suave capa de leche vaporizada.',
    precio: '$72.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE FLAT WHITE
  }
];

export const frappeProducts = [
  {
    id: 'f1',
    nombre: 'Caramel Frappuccino®',
    descripcion: 'Café mezclado con hielo, leche y delicioso jarabe de caramelo, cubierto con una espiral de crema batida y un toque extra de caramelo.',
    precio: '$85.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CARAMEL FRAPPUCCINO
  },
  {
    id: 'f2',
    nombre: 'Mocha Frappuccino®',
    descripcion: 'Nuestra salsa de chocolate premium mezclada con café, leche entera y hielo, terminada con crema batida para los amantes del chocolate.',
    precio: '$85.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE MOCHA FRAPPUCCINO
  },
  {
    id: 'f3',
    nombre: 'Matcha Green Tea Frappuccino®',
    descripcion: 'Una mezcla premium de té verde matcha japonés dulce, leche entera, hielo y crema batida para una vibrante experiencia refrescante.',
    precio: '$89.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE MATCHA FRAPPUCCINO
  },
  {
    id: 'f4',
    nombre: 'Strawberries & Cream Frappuccino®',
    descripcion: 'Deliciosa salsa de fresas con leche y hielo batido, terminado con una generosa nube de crema batida y un toque frutal irresistible.',
    precio: '$87.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE STRAWBERRIES FRAPPUCCINO
  },
  {
    id: 'f5',
    nombre: 'Java Chip Frappuccino®',
    descripcion: 'Chispas de chocolate crujientes batidas con café, leche entera, hielo y salsa de chocolate, cubierto con crema batida y espiral de mocha.',
    precio: '$89.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1626264489332-b0724823a633?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE JAVA CHIP
  },
  {
    id: 'f6',
    nombre: 'Cookies & Cream Frappuccino®',
    descripcion: 'Exquisita combinación de galletas de chocolate crujientes trituradas y mezcladas con crema batida, leche vaporizada y hielo.',
    precio: '$86.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE COOKIES & CREAM
  }
];

export const postresProducts = [
  {
    id: 'p1',
    nombre: 'Cheesecake con Frambuesa',
    descripcion: 'Una suave y cremosa base de pay de queso estilo Nueva York montada sobre galleta crujiente, terminada con una deliciosa mermelada de frambuesa.',
    precio: '$65.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CHEESECAKE
  },
  {
    id: 'p2',
    nombre: 'Pastel de Chocolate Premium',
    descripcion: 'Tres deliciosas y húmedas capas de pastel de chocolate amargo, rellenas y cubiertas con un cremoso fudge de chocolate.',
    precio: '$68.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE PASTEL DE CHOCOLATE
  },
  {
    id: 'p3',
    nombre: 'Croissant de Mantequilla',
    descripcion: 'Clásico pan francés hojaldrado elaborado con capas de mantequilla premium, horneado al momento para ofrecer una textura crujiente y dorada.',
    precio: '$42.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CROISSANT
  },
  {
    id: 'p4',
    nombre: 'Muffin de Blueberries',
    descripcion: 'Esponjoso panecillo horneado repleto de moras azules frescas de temporada y decorado con un toque crujiente de azúcar en la parte superior.',
    precio: '$46.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE MUFFIN
  },
  {
    id: 'p5',
    nombre: 'Dona Glaseada',
    descripcion: 'Suave dona con una textura esponjosa y ligera, cubierta por una fina capa de glaseado dulce tradicional que se derrite en tu boca.',
    precio: '$38.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE DONA
  },
  {
    id: 'p6',
    nombre: 'Cinnamon Roll',
    descripcion: 'Exquisito rollo de canela recién horneado con un toque de azúcar mascabado, cubierto con un cremoso glaseado de queso crema.',
    precio: '$52.00 MXN',
    imagen: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400' // <-- REEMPLAZA ESTE ENLACE CON LA URL DE TU IMAGEN DE CINNAMON ROLL
  }
];

export const destacadosInfo = [
  {
    id: 'd1',
    titulo: 'Cafés Especiales',
    descripcion: 'Desde el clásico americano hasta el reconfortante Flat White.',
    icono: 'fa-coffee',
    link: '/menu-cafe'
  },
  {
    id: 'd2',
    titulo: 'Frappés Premium',
    descripcion: 'Fríos, espumosos y con sabores vibrantes para tu día.',
    icono: 'fa-ice-cream',
    link: '/menu-frappes'
  },
  {
    id: 'd3',
    titulo: 'Repostería Exquisita',
    descripcion: 'El acompañamiento ideal con hojaldrados y repostería horneada.',
    icono: 'fa-cookie-bite',
    link: '/menu-postres'
  }
];

export const testimonios = [
  {
    id: 't1',
    nombre: 'Sofía Martínez',
    fecha: 'Hace 3 días',
    estrellas: 5,
    comentario: '¡Me encanta este lugar! El Flat White tiene la temperatura y el sabor ideal, y el ambiente es perfecto para estudiar o trabajar.'
  },
  {
    id: 't2',
    nombre: 'Carlos G.',
    fecha: 'Hace 1 semana',
    estrellas: 5,
    comentario: 'El Caramel Frappuccino es el mejor que he probado en la ciudad. El servicio es sumamente amable y rápido. ¡Muy recomendado!'
  },
  {
    id: 't3',
    nombre: 'Ximena D.',
    fecha: 'Hace 2 semanas',
    estrellas: 5,
    comentario: 'El Cheesecake con Frambuesa es de otro mundo. Suave, cremoso y perfectamente balanceado. Volveré sin duda.'
  }
];
