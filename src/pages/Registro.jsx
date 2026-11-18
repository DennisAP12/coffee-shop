import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackModal from '../components/FeedbackModal';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: '', type: 'info', title: '' });
  const navigate = useNavigate();
  // No necesitamos login() aquí si queremos que el usuario inicie sesión manualmente, o podemos autologuearlo.
  // Vamos a redirigirlo a login para que ingrese sus datos recién creados.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!aceptaTerminos) {
      setErrorMsg('Debes aceptar los Términos y Condiciones para registrarte.');
      return;
    }

    if (nombre && correo && password) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, correo, password })
        });

        const data = await response.json();

        if (response.ok) {
          setModalConfig({
            isOpen: true,
            title: '¡Registro Exitoso!',
            message: `¡Felicidades, ${nombre}! Tu cuenta ha sido creada exitosamente. Por favor, inicia sesión.`,
            type: 'success'
          });
        } else {
          setErrorMsg(data.error || 'Error al registrar la cuenta');
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
          <h2 style={{ fontSize: '28px', color: 'var(--color-brand-dark)', fontWeight: '800' }}>Crea tu Cuenta</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Regístrate para empezar a acumular estrellas y recompensas
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              placeholder="Ej. Juan Pérez" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '25px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                style={{ accentColor: 'var(--color-brand-dark)', marginTop: '3px' }} 
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                required
              />
              <span>Acepto los <a href="#terminos" style={{ color: 'var(--color-brand-accent)', fontWeight: '600' }}>Términos de Uso</a> y la <a href="#privacidad" style={{ color: 'var(--color-brand-accent)', fontWeight: '600' }}>Política de Privacidad</a> de Starbucks Vibes.</span>
            </label>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-dark" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
            Registrarse
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', borderTop: '1px solid var(--color-border-gray)', paddingTop: '20px' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>¿Ya tienes una cuenta? </span>
          <Link to="/login" style={{ color: 'var(--color-brand-accent)', fontWeight: '700' }}>Inicia sesión</Link>
        </div>
      </div>

      <FeedbackModal 
        isOpen={modalConfig.isOpen}
        onClose={() => {
          setModalConfig({ ...modalConfig, isOpen: false });
          navigate('/login');
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
}
