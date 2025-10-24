import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CrearNota() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/notas", {
        titulo,
        contenido,
      });
      Swal.fire("Éxito", "Nota creada exitosamente", "success");
      navigate("/notas");
    } catch (error) {
      Swal.fire("Error", "Error al crear la nota", "error");
    }
  };

  return (
    <div>
      <h2>Crear Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contenido:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Nota</button>
      </form>
    </div>
  );
}

export default CrearNota;