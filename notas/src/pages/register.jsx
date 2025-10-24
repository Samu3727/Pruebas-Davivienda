import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

export default function Register({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });

      // Manejo seguro de respuestas que no son JSON (ej. "Proxy error" HTML)
      const contentType = res.headers.get('content-type') || '';
      let data = null;
      let text = null;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        text = await res.text();
      }

      if (!res.ok) {
        const msg = (data && data.error) || text || `Error ${res.status} ${res.statusText}`;
        setError(msg);
        setLoading(false);
        return;
      }

      if (data && data.token) setToken(data.token);
      if (data && data.user) setUser(data.user);
      if (onLogin) onLogin(true);
      setLoading(false);
      navigate('/notas', { replace: true });
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar al servidor');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="card shadow" style={{ width: 420 }}>
        <div className="card-body p-4">
          <h4 className="mb-3">Crear cuenta</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Creando...' : 'Crear cuenta'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
