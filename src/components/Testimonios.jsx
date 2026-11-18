import { testimonios } from '../utils/datosMenu';
import '../styles/Testimonios.css';

export default function Testimonios() {
  return (
    <section className="testimonios-section" id="testimonios">
      <div className="testimonios-header">
        <span className="testimonios-subtitle">VOCES DE NUESTROS CLIENTES</span>
        <h2>¿Qué opinan de nosotros?</h2>
        <div className="decor-line"></div>
        <p>La opinión de quienes nos visitan todos los días es nuestra mayor motivación para seguir sirviendo excelencia.</p>
      </div>

      <div className="testimonios-grid">
        {testimonios.map((t) => (
          <div key={t.id} className="testimonio-card">
            <div className="quote-icon">
              <i className="fa-solid fa-quote-left"></i>
            </div>
            
            {/* Sistema de Estrellas de Font Awesome */}
            <div className="star-rating">
              {[...Array(t.estrellas)].map((_, i) => (
                <i key={i} className="fa-solid fa-star star-filled"></i>
              ))}
            </div>

            <p className="testimonio-text">"{t.comentario}"</p>
            
            <div className="testimonio-author">
              <div className="author-info">
                <h4 className="author-name">{t.nombre}</h4>
                <span className="author-date">{t.fecha}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
