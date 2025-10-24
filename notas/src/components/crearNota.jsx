import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CrearNota() {
  const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/notas", {
        titulo,
        descripcion,
        contenido,
      });
      Swal.fire("Éxito", "Nota creada exitosamente", "success");
      navigate("/notas");
    } catch (error) {
      Swal.fire("Error", "Error al crear la nota", "error");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: 760 }}>
      <div className="card-body">
        <h2 className="card-title">Crear Nota</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenido</label>
            <textarea
              className="form-control"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={6}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Crear Nota</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/notas')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearNota;