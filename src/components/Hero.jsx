import { Link } from 'react-router-dom';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="hero-section hero-section-primary">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
            alt="Café preparado artesanalmente"
          />
          <div className="hero-image-badge">
            <span>Desde</span>
            <strong>$58</strong>
          </div>
        </div>
        <div className="hero-content dark-green animate-fade-in">
          <span className="hero-eyebrow">Tu pausa favorita</span>
          <h2>Empieza el día con nuevas vibes.</h2>
          <p>Café de especialidad, ingredientes cuidadosamente seleccionados y ese sabor que hace diferente cada momento.</p>
          <Link to="/menu-cafe" className="btn-bordered">
            Explorar cafés <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div className="hero-section alt-layout hero-section-secondary">
        <div className="hero-content light-green animate-fade-in">
          <span className="hero-eyebrow hero-eyebrow-dark">Frescura en cada sorbo</span>
          <h2>Frappés que hacen una diferencia.</h2>
          <p>Texturas cremosas, sabores intensos y combinaciones pensadas para acompañar tu mejor momento.</p>
          <Link to="/menu-frappes" className="btn-bordered-dark">
            Ver frappés <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1400&q=85"
            alt="Frappé frío con crema"
          />
          <div className="hero-image-badge hero-image-badge-light">
            <span>Nuevo</span>
            <strong>Premium</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
