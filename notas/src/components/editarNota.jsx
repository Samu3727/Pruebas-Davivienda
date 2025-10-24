import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarNota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/notas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Nota no encontrada: ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) return res.json();
        return res.text().then((txt) => {
          throw new Error(`Se esperaba JSON pero el servidor devolvió: ${txt.slice(0, 500)}`);
        });
      })
      .then((data) => {
        if (!mounted) return;
        setTitulo(data.titulo || '');
        setDescripcion(data.descripcion || '');
        setContenido(data.contenido || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/notas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, contenido }),
      });
      if (!res.ok) {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          const errJson = await res.json();
          throw new Error(errJson.message || `Error actualizando nota: ${res.status}`);
        }
        const txt = await res.text();
        throw new Error(`Error actualizando nota: ${res.status} - ${txt}`);
      }
      navigate('/notas');
    } catch (err) {
      alert('Error al actualizar la nota: ' + err.message);
    }
  };

  if (loading) return <div className="text-center">Cargando nota...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card mx-auto" style={{ maxWidth: 760 }}>
      <div className="card-body">
        <h2 className="card-title">Editar Nota</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenido</label>
            <textarea className="form-control" value={contenido} onChange={(e) => setContenido(e.target.value)} rows={8} />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/notas')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarNota;
