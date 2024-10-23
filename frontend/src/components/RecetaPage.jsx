import React, { useState } from 'react';
import RecetaList from './RecetaList';
import RecetaForm from './RecetaForm'; // Formulario de agregar recetas
import './RecetaPage.css'; // Estilos CSS para la página de recetas

const RecetaPage = () => {
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  // Función para abrir el modal y mostrar el formulario
  const openForm = () => setShowForm(true);

  // Función para cerrar el modal
  const closeForm = () => setShowForm(false);

  return (
    <div className="receta-page">
      <header className="header">
        

        {/* Botón para abrir el modal */}
        <button className="add-recipe-btn" onClick={openForm}>
          Agregar Receta
        </button>
      </header>

      {/* Mostrar el modal solo si el estado showForm es true */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>
              &times; {/* Icono de cerrar */}
            </span>
            <RecetaForm onClose={closeForm} /> {/* Asegúrate de pasar onClose como prop */}
          </div>
        </div>
      )}

      {/* Lista de recetas */}
      <RecetaList />
    </div>
  );
};

export default RecetaPage;
