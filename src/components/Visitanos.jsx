import '../styles/Visitanos.css';

export default function Visitanos() {
  return (
    <section className="visitanos-section" id="visitanos">
      <div className="visitanos-grid-container">

        {/* Bloque Izquierdo: Información, dirección y horarios */}
        <div className="visitanos-info-block">
          <span className="visitanos-subtitle">ESTAMOS CERCA DE TI</span>
          <h2>¡Visítanos Hoy!</h2>
          <div className="decor-line-left"></div>
          <p className="visitanos-desc">
            Disfruta de un ambiente inigualable diseñado especialmente para ti. Te esperamos para compartir grandes momentos acompañados de tu café favorito.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div className="contact-text">
                <h4>Dirección</h4>
                <p>Av. de la Juventud #405, Zona Centro</p>
                <p>Uriangato, Guanajuato, México</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="contact-text">
                <h4>Horarios de Atención</h4>
                <p>Lunes a Viernes: 7:00 AM - 10:00 PM</p>
                <p>Sábados y Domingos: 8:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="contact-text">
                <h4>Teléfono & Contacto</h4>
                <p>+52 (445) 123 4567</p>
                <p>hola@starbucksvibes.com.mx</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
