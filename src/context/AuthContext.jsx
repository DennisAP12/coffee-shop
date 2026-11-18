import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar la app, revisar si hay un token guardado y recuperar el usuario
    const storedUser = localStorage.getItem('sv_user');
    const token = localStorage.getItem('sv_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('sv_user', JSON.stringify(userData));
    localStorage.setItem('sv_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sv_user');
    localStorage.removeItem('sv_token');
  };

  const isAdmin = user?.rol === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
