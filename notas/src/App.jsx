import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CrearNota from './components/crearNota';
import ListaNotas from './components/listaNotas';
import ModificarNota from './components/modificarNota';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /notas so "/" has a matched route */}
        <Route path="/" element={<Navigate to="/notas" replace />} />
        <Route path="/notas" element={<ListaNotas />} />
        <Route path="/crear-nota" element={<CrearNota />} />
        <Route path="/editar-nota/:id" element={<ModificarNota />} />
        {/* Catch-all route */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;