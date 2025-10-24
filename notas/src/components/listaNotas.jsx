import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ListaNotas() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('http://localhost:3000/api/notas', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error al obtener notas: ${res.status}`);
        return res.json();
      })
      .then((data) => setNotas(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <div>Cargando notas...</div>;
  if (error) return <div>Error: {error}</div>;

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Eliminar nota? Esto la marcará como eliminada (soft delete).');
    if (!confirmed) return;
    try {
      const res = await fetch(`http://localhost:3000/api/notas/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Error eliminando nota: ${res.status}`);
      // eliminar localmente
      setNotas((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert('Error al eliminar la nota: ' + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-nota/${id}`);
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Notas</h2>
        <Link to="/crear-nota">Crear nueva nota</Link>
      </div>

      {notas.length === 0 ? (
        <p>No hay notas para mostrar.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {notas.map((nota) => (
            <article
              key={nota.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              <h3 style={{ margin: '0 0 8px' }}>{nota.titulo || 'Sin título'}</h3>
              {nota.descripcion && <p style={{ margin: '0 0 8px', color: '#555' }}>{nota.descripcion}</p>}
              {nota.contenido && <p style={{ margin: '0 0 12px' }}>{nota.contenido}</p>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => handleEdit(nota.id)}
                  style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(nota.id)}
                  style={{ background: '#e53935', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                  aria-label={`Eliminar nota ${nota.id}`}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaNotas;
