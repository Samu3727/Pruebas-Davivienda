import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrearNota from './components/crearNota';
import ListaNotas from './components/listaNotas';
import EditarNota from './components/editarNota';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/notas" element={<ListaNotas />} />
        <Route path="/crear-nota" element={<CrearNota />} />
        <Route path="/editar-nota/:id" element={<EditarNota />} />
      </Routes>
    </Router>
  );
}

export default App;