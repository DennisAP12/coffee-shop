import { Link } from 'react-router-dom';
import { destacadosInfo } from '../utils/datosMenu';
import '../styles/MenuDestacado.css';

export default function MenuDestacado() {
  return (
    <section className="destacado-section" id="menu">
      <div className="destacado-header">
        <span className="destacado-subtitle">LO MEJOR DE NUESTRA CASA</span>
        <h2>Menú Destacado</h2>
        <div className="decor-line"></div>
        <p>Explora nuestras tres deliciosas categorías preparadas con ingredientes seleccionados y con el toque único que ya conoces.</p>
      </div>

      <div className="destacado-grid">
        {destacadosInfo.map((cat) => (
          <div key={cat.id} className="destacado-card">
            <div className="card-icon-wrapper">
              <i className={`fa-solid ${cat.icono} card-icon`}></i>
            </div>
            <h3>{cat.titulo}</h3>
            <p>{cat.descripcion}</p>
            <Link to={cat.link} className="btn-bordered-dark card-btn">
              Ver menú <i className="fa-solid fa-arrow-right arrow-icon"></i>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
