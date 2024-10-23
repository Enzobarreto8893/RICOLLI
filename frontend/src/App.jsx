import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import RecetaForm from './components/RecetaForm';
import MateriaPrimaList from './components/MateriaPrimaList';
import RecetaList from './components/RecetaList';
import './App.css'; // Asegúrate de tener los estilos correctos aquí
import RecetaPage from './components/RecetaPage';  // Usar el componente ya importado
// Importa las imágenes directamente
import logoRicolli from './assets/logoRicolli.png';
import recetasImg from './assets/recetas.jpg';
import materiasPrimasImg from './assets/materiasprimas.jpg';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <img src={logoRicolli} alt="Logo Ricolli" className="logo" />
          <h1>Trazabilidad de RICOLLI</h1>
        </header>

        {/* Configuración de las rutas */}
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
          <Route path="/recetas" element={<RecetaPage />} /> {/* Página de recetas */}
          <Route path="/materias-primas" element={<MateriaPrimaPage />} /> {/* Página de materias primas */}
        </Routes>
      </div>
    </Router>
  );
}

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Página de Inicio</h2>

      {/* Div uno debajo del otro */}
      <section className="card-section-vertical">
        <div
          className="card"
          onClick={() => navigate('/recetas')}
          style={{ backgroundImage: `url(${recetasImg})` }} // Imagen para Recetas
        >
          <h3>Recetas</h3>
        </div>

        <div
          className="card"
          onClick={() => navigate('/materias-primas')}
          style={{ backgroundImage: `url(${materiasPrimasImg})` }} // Imagen para Materias Primas
        >
          <h3>Materias Primas</h3>
        </div>
      </section>
    </div>
  );
};

// Elimina esta sección porque ya importaste RecetaPage
// const RecetaPage = () => (
//   <div className="page-container">
//     <h2>Recetas</h2>
//     <RecetaForm /> {/* Formulario para agregar recetas */}
//     <RecetaList /> {/* Lista de recetas */}
//   </div>
// );

// Página de Materias Primas con la lista de materias primas
const MateriaPrimaPage = () => (
  <div className="page-container">
    <h2>Materias Primas</h2>
    <MateriaPrimaList /> {/* Lista de materias primas */}
  </div>
);

export default App;
