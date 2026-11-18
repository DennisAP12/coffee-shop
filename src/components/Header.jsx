import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const handleLogout = () => {
    logout();
    cerrarMenu();
    navigate('/');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={cerrarMenu}>
          <img src="/imagnes/logo.jpg" alt="Starbucks Vibes" className="logo-img" />
        </Link>
        <nav className={`nav-menu ${menuAbierto ? 'abierto' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'} onClick={cerrarMenu}>
            INICIO
          </NavLink>
          <NavLink to="/menu-cafe" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'} onClick={cerrarMenu}>
            CAFÉ
          </NavLink>
          <NavLink to="/menu-frappes" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'} onClick={cerrarMenu}>
            FRAPPÉS
          </NavLink>
          <NavLink to="/menu-postres" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'} onClick={cerrarMenu}>
            POSTRES
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-item activo' : 'nav-item'} style={{color: 'var(--color-brand-primary)'}} onClick={cerrarMenu}>
              ADMIN
            </NavLink>
          )}
          <div className="mobile-nav-actions">
            {user ? (
              <button className="btn-dark" onClick={handleLogout}>Cerrar sesión</button>
            ) : (
              <>
                <Link to="/login" className="btn-outline" onClick={cerrarMenu}>Ingresar</Link>
                <Link to="/registro" className="btn-dark" onClick={cerrarMenu}>Únete</Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <div className="navbar-right">
        {/* Enlace para Localizar Tienda */}
        <a href="#visitanos" className="locales-link">
          <i className="fa-solid fa-location-dot"></i> Localizar Tienda
        </a>
        
        <div className="cart-icon-wrapper">
          <Link to="/carrito" className="cart-link" onClick={cerrarMenu}>
            <i className="fa-solid fa-cart-shopping"></i>
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </Link>
        </div>

        <div className="buttons-group">
          {user ? (
            <button className="btn-outline" onClick={handleLogout}>Salir ({user.nombre.split(' ')[0]})</button>
          ) : (
            <>
              <Link to="/login" className="btn-outline" onClick={cerrarMenu}>Ingresar</Link>
              <Link to="/registro" className="btn-dark" onClick={cerrarMenu}>Únete</Link>
            </>
          )}
        </div>

        {/* Botón de Menú Hamburguesa para Móvil */}
        <button className={`hamburger-menu ${menuAbierto ? 'activo' : ''}`} onClick={toggleMenu} aria-label="Menú">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Overlay para cerrar menú móvil al dar clic fuera */}
      {menuAbierto && <div className="menu-overlay" onClick={cerrarMenu}></div>}
    </header>
  );
}
