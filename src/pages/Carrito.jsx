import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Carrito.css';

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    cart.forEach((item) => {
      const stock = Number(item.stock);
      if (stock >= 0 && item.cantidad > stock) {
        updateQuantity(item.id, -(item.cantidad - stock));
      }
    });
  }, []);

  const handlePagar = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setErrorMsg(null);
    setProcessing(true);
    try {
      const response = await fetch('http://localhost:3000/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: user.id,
          items: cart
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al procesar la compra.');
      }

      clearCart();
      setPagoExitoso(true);
    } catch (err) {
      setErrorMsg(err.message || 'Error de conexión con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setProcessing(false);
    }
  };

  if (pagoExitoso) {
    return (
      <div className="carrito-page-container">
        <div className="carrito-success">
          <i className="fa-solid fa-circle-check"></i>
          <h2>¡Pago Exitoso!</h2>
          <p>Tu orden ha sido procesada y se está preparando.</p>
          <Link to="/" className="btn-volver">Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="carrito-page-container">
        <div className="carrito-empty">
          <i className="fa-solid fa-cart-shopping"></i>
          <h2>Tu carrito está vacío</h2>
          <p>Parece que aún no has agregado ningún producto a tu orden.</p>
          <Link to="/menu-cafe" className="btn-volver">Ver Menú de Café</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page-container">
      <div className="carrito-header">
        <h1>Tu Carrito</h1>
        <div className="carrito-decor-line"></div>
      </div>

      <div className="carrito-content">
        <div className="carrito-items-section">
          {cart.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} className="item-image" />
              <div className="item-details">
                <h3>{item.nombre}</h3>
                <span className="item-price">${Number(item.precio || 0).toFixed(2)} MXN</span>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="quantity-display">{item.cantidad}</span>
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)} disabled={item.cantidad >= Number(item.stock)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <i className="fa-solid fa-trash"></i> Eliminar
                  </button>
                </div>
              </div>
              <div className="item-subtotal">
                <strong>
                  ${(Number(item.precio || 0) * item.cantidad).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>

        <div className="carrito-summary-section">
          <h3 className="summary-title">Resumen de Compra</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)} MXN</span>
          </div>
          <div className="summary-row">
            <span>Impuestos (IVA 16%)</span>
            <span>${(getCartTotal() * 0.16).toFixed(2)} MXN</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>${(getCartTotal() * 1.16).toFixed(2)} MXN</span>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          {user ? (
            <button className="btn-pagar" onClick={handlePagar} disabled={processing}>
              <i className={`fa-solid ${processing ? 'fa-spinner fa-spin' : 'fa-credit-card'}`}></i> {processing ? 'Procesando…' : 'Pagar Ahora'}
            </button>
          ) : (
            <button className="btn-pagar" onClick={handlePagar} style={{ backgroundColor: 'var(--color-brand-dark)' }}>
              <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión para Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
