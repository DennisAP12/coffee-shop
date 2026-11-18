import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/MenuPagina.css';

export default function MenuFrappes() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos?categoria=frappe');
        if (!response.ok) {
          throw new Error('Error al obtener los frappés');
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleAddToCart = (producto) => {
    if (Number(producto.stock) <= 0) return;
    addToCart(producto);
  };

  if (loading) {
    return (
      <div className="menu-page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ color: 'var(--color-brand-dark)', fontSize: '18px', fontWeight: 'bold' }}>Cargando frappés helados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ color: '#c62828', fontSize: '18px', fontWeight: 'bold' }}>Error de conexión: {error}. Verifica que el backend esté corriendo.</div>
      </div>
    );
  }

  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <span className="menu-page-subtitle">ESPUMOSOS Y REFRESCANTES</span>
        <h1>Menú de Frappés</h1>
        <div className="decor-line"></div>
        <p>
          Bebidas batidas con hielo, leche y tus jarabes preferidos, coronadas con nuestra suave crema batida clásica.
        </p>
      </div>

      {/* Cuadrícula de Tarjetas */}
      <div className="menu-products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <div className={`product-image-wrapper ${Number(producto.stock) <= 0 ? 'product-out' : ''}`}>
              <img src={producto.imagen} alt={producto.nombre} />
              {Number(producto.stock) <= 5 && Number(producto.stock) > 0 && <span className="product-stock-badge">Últimas {producto.stock} unidades</span>}
              {Number(producto.stock) <= 0 && <span className="product-stock-badge sold-out">Agotado</span>}
            </div>

            <div className="product-info">
              <div className="product-title-row">
                <h3>{producto.nombre}</h3>
                <span className="etiqueta">${Number(producto.precio || 0).toFixed(2)} MXN</span>
              </div>

              <p className="product-description">{producto.descripcion}</p>

              <div className="product-action-row">
                <span className="product-stock-label"><i className="fa-solid fa-circle-check"></i> Disponible</span>
                <button className="btn-order-quick" onClick={() => handleAddToCart(producto)} disabled={Number(producto.stock) <= 0}>
                  <i className="fa-solid fa-cart-plus"></i> {Number(producto.stock) <= 0 ? 'Agotado' : 'Añadir'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
