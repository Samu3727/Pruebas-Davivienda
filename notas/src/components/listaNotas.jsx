import React from 'react';
import { Link } from 'react-router-dom';

function ListaNotas() {
  // Este es un componente mínimo para evitar errores de importación.
  // Puedes ampliarlo más tarde para pedir datos al backend.
  return (
    <div>
      <h2>Lista de Notas</h2>
      <p>Aquí aparecerán las notas (componente placeholder).</p>
      <p>
        <Link to="/crear-nota">Crear nueva nota</Link>
      </p>
      <p>
        Ejemplo de enlace para editar una nota: <Link to="/editar-nota/1">Editar nota 1</Link>
      </p>
    </div>
  );
}

export default ListaNotas;
