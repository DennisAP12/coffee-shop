import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/imagnes/logo.jpg" alt="Logo" className="footer-logo" />
          <p className="footer-tagline">Tu nuevo mood comienza hoy con el mejor sabor.</p>
        </div>

        <div className="footer-links-group">
          <h4>Menú</h4>
          <ul>
            <li><Link to="/menu-cafe">Café Especial</Link></li>
            <li><Link to="/menu-frappes">Frappés Premium</Link></li>
            <li><Link to="/menu-postres">Repostería Horneada</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Sobre Nosotros</h4>
          <ul>
            <li><a href="#visitanos">Localizar Tienda</a></li>
            <li><a href="#testimonios">Opiniones de Clientes</a></li>
            <li><a href="#nosotros">Nuestra Historia</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {anioActual} Starbucks Vibes. Todos los derechos reservados.</p>
        <div className="footer-legal">
          <a href="#privacidad">Política de Privacidad</a>
          <span className="separator">|</span>
          <a href="#terminos">Términos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
