import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import CrearNota from './components/crearNota';
import ListaNotas from './components/listaNotas';
import EditarNota from './components/editarNota';

function App() {
  return (
    <Router>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/notas">Notas</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            </div>
          </div>
        </nav>
      </header>

      <main className="container mt-4">
        <Routes>
          {/* Redirect root to /notas so "/" has a matched route */}
          <Route path="/" element={<Navigate to="/notas" replace />} />
          <Route path="/notas" element={<ListaNotas />} />
          <Route path="/crear-nota" element={<CrearNota />} />
          <Route path="/editar-nota/:id" element={<EditarNota />} />
          {/* Catch-all route */}
          <Route path="*" element={<div className="text-center">404 - Página no encontrada</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;