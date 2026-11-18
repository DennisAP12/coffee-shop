import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Vistas / Páginas
import LandingPage from './pages/LandingPage';
import MenuCafe from './pages/MenuCafe';
import MenuFrappes from './pages/MenuFrappes';
import MenuPostres from './pages/MenuPostres';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Utilidad para subir al inicio en cada cambio de ruta */}
          <ScrollToTop />
          
          {/* Barra de navegación global sticky */}
          <Header />
          
          {/* Contenedor principal de vistas */}
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/menu-cafe" element={<MenuCafe />} />
              <Route path="/menu-frappes" element={<MenuFrappes />} />
              <Route path="/menu-postres" element={<MenuPostres />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/carrito" element={<Carrito />} />
              
              {/* Ruta Protegida solo para Administradores */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          {/* Pie de página global */}
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
