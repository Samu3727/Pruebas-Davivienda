import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearAuth } from '../utils/auth';

function ListaNotas() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  const controller = new AbortController();
    const token = getToken();
    fetch('/api/notas', { signal: controller.signal, headers: { Authorization: token ? `Bearer ${token}` : '' } })
      .then((res) => {
        if (res.status === 401) {
          // token inválido o expirado
          clearAuth();
          navigate('/login', { replace: true });
          throw new Error('No autorizado');
        }
        if (!res.ok) throw new Error(`Error al obtener notas: ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) return res.json();
        return res.text().then((txt) => {
          throw new Error(`Se esperaba JSON pero el servidor devolvió: ${txt.slice(0, 500)}`);
        });
      })
      .then((data) => setNotas(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [navigate]);

  if (loading) return <div className="text-center">Cargando notas...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Eliminar nota? Esto la marcará como eliminada (soft delete).');
    if (!confirmed) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/notas/${id}`, { method: 'DELETE', headers: { Authorization: token ? `Bearer ${token}` : '' } });
      if (!res.ok) throw new Error(`Error eliminando nota: ${res.status}`);
      setNotas((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert('Error al eliminar la nota: ' + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-nota/${id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Lista de Notas</h2>
        <Link className="btn btn-success" to="/crear-nota">Crear nueva nota</Link>
      </div>

      {notas.length === 0 ? (
        <div className="alert alert-info">No hay notas para mostrar.</div>
      ) : (
        <div className="row g-3">
          {notas.map((nota) => (
            <div className="col-sm-6 col-md-4" key={nota.id}>
              <article className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{nota.titulo || 'Sin título'}</h5>
                  {nota.descripcion && <h6 className="card-subtitle mb-2 text-muted">{nota.descripcion}</h6>}
                  {nota.contenido && <p className="card-text">{nota.contenido}</p>}
                  <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(nota.id)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(nota.id)} aria-label={`Eliminar nota ${nota.id}`}>Eliminar</button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaNotas;
