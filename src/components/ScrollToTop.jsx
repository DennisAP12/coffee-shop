import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que restablece la posición del scroll al inicio (0, 0)
 * de la ventana automáticamente cada vez que se cambia de ruta.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll inmediato a la cima
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Subida instantánea para que el usuario no vea el salto, o 'smooth'
    });
  }, [pathname]);

  return null;
}
