import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CrearNota from './components/crearNota';
import ListaNotas from './components/listaNotas';
import EditarNota from './components/editarNota';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated, clearAuth } from './utils/auth';

function App() {
  const [auth, setAuth] = useState(isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLogout = () => {
    clearAuth();
    setAuth(false);
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to={auth ? '/notas' : '/login'}>Notas</Link>
            <div className="d-flex">
              {auth ? (
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Cerrar sesión</button>
              ) : (
                <Link className="btn btn-outline-light btn-sm" to="/login">Iniciar sesión</Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={() => setAuth(true)} />} />
          <Route path="/register" element={<Register onLogin={() => setAuth(true)} />} />

          <Route path="/notas" element={
            <PrivateRoute>
              <ListaNotas />
            </PrivateRoute>
          } />

          <Route path="/crear-nota" element={
            <PrivateRoute>
              <CrearNota />
            </PrivateRoute>
          } />

          <Route path="/editar-nota/:id" element={
            <PrivateRoute>
              <EditarNota />
            </PrivateRoute>
          } />

          <Route path="*" element={<div className="text-center">404 - Página no encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;