import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: '', type: 'info', title: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (correo && password) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, password })
        });

        const data = await response.json();

        if (response.ok) {
          login(data.user, data.token);
          setModalConfig({
            isOpen: true,
            title: '¡Bienvenido!',
            message: `¡Bienvenido de nuevo, ${data.user.nombre}!`,
            type: 'success',
            redirect: data.user.rol === 'admin' ? '/admin' : '/'
          });
        } else {
          setErrorMsg(data.error || 'Error al iniciar sesión');
        }
      } catch (err) {
        setErrorMsg('Error de conexión con el servidor. Verifica que el backend esté corriendo.');
      }
    } else {
      setErrorMsg('Por favor, rellena todos los campos.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 180px)', padding: '20px' }}>
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-brand-dark)', fontWeight: '800' }}>Iniciar Sesión</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Únete a tus recompensas de Starbucks Vibes
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="tu@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-brand-dark)' }} /> Recordarme
            </label>
            <a href="#olvidaste" style={{ color: 'var(--color-brand-accent)', fontWeight: '600' }}>¿Olvidaste tu contraseña?</a>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-dark" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
            Ingresar
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', borderTop: '1px solid var(--color-border-gray)', paddingTop: '20px' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>¿No tienes una cuenta aún? </span>
          <Link to="/registro" style={{ color: 'var(--color-brand-accent)', fontWeight: '700' }}>Regístrate gratis</Link>
        </div>
      </div>

      <FeedbackModal
        isOpen={modalConfig.isOpen}
        onClose={() => {
          setModalConfig({ ...modalConfig, isOpen: false });
          if (modalConfig.redirect) {
            navigate(modalConfig.redirect);
          }
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
}
