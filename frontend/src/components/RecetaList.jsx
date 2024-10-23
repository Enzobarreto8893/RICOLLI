import React, { useEffect, useState } from 'react';
import './RecetaList.css';

const RecetaList = () => {
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [mostrarQR, setMostrarQR] = useState(false); // Estado para controlar el modal del QR

  useEffect(() => {
    fetch('http://localhost:3000/recetas')
      .then((response) => response.json())
      .then((data) => {
        console.log("Recetas recibidas desde el backend:", data); // Aquí puedes verificar si el `qrUrl` llega correctamente
        setRecetas(data);
      })
      .catch((error) => console.error('Error fetching recetas:', error));
  }, []);
  

  const eliminarReceta = (id, e) => {
    e.stopPropagation(); // Evitar que el clic en el botón de eliminar active el evento onClick del div
    fetch(`http://localhost:3000/recetas/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar receta');
        }
        return response.json();
      })
      .then((data) => {
        setRecetas(recetas.filter((receta) => receta.id !== id));
      })
      .catch((error) => console.error('Error eliminando receta:', error));
  };

  const verDetallesReceta = (receta) => {
    console.log("Receta seleccionada:", receta); // Verifica si qrUrl está presente
    setRecetaSeleccionada(receta); // Guardar la receta seleccionada
  };
  

  const abrirModalQR = () => {
    console.log("Mostrando QR de la receta:", recetaSeleccionada.qrUrl); // Verificar si el QR está disponible
    setMostrarQR(true); // Mostrar modal del QR
  };
  
  const cerrarModalQR = () => {
    setMostrarQR(false); // Cerrar modal del QR
  };

  return (
    <div className="receta-list">
      <h2>Nuestras Recetas</h2>
      <div className="recetas-grid">
        {recetas.length === 0 ? (
          <p>No hay recetas disponibles</p>
        ) : (
          recetas.map((receta) => (
            <div key={receta.id} className="receta-card" onClick={() => verDetallesReceta(receta)}>
              <div className="receta-image">
                <img src={`http://localhost:3000/imagenes/${receta.imagen}`} alt={receta.nombre} />
              </div>
              <div className="receta-content">
                <h3>{receta.nombre}</h3>
                <p>{receta.descripcion}</p>
                <p><strong>Ingredientes:</strong> {receta.ingredientes}</p>
                <div className="receta-info">
                  <span className="receta-fecha">📅 {new Date(receta.fecha).toLocaleDateString()}</span> {/* Mostrar fecha */}
                  <span className="receta-comentarios">💬 0 comentarios</span>
                </div>
                {/* Botón para eliminar la receta */}
                <button className="eliminar-btn" onClick={(e) => eliminarReceta(receta.id, e)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mostrar modal de detalles si hay una receta seleccionada */}
      {recetaSeleccionada && (
        <div className="modal detalles-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setRecetaSeleccionada(null)}>&times;</span>
            <h3>{recetaSeleccionada.nombre}</h3>
            <img src={`http://localhost:3000/imagenes/${recetaSeleccionada.imagen}`} alt={recetaSeleccionada.nombre} />
            <p>{recetaSeleccionada.descripcion}</p>
            <p><strong>Ingredientes:</strong> {recetaSeleccionada.ingredientes}</p>
            <p><strong>Fecha:</strong> {new Date(recetaSeleccionada.fecha).toLocaleDateString()}</p> {/* Mostrar fecha */}
            <p><strong>Hecho por:</strong> {recetaSeleccionada.hecho}</p> {/* Mostrar hecho por */}

            {/* Enlace para ver el QR */}
            <p><strong>Código QR:</strong></p>
            <a href="#" onClick={abrirModalQR}>Ver código QR</a>

            {/* Mostrar el modal del QR cuando se hace clic en "Ver código QR" */}
            {mostrarQR && (
              <div className="modal qr-modal">
                <div className="modal-content">
                  <span className="close-btn" onClick={cerrarModalQR}>&times;</span>
                  <h3>Código QR de {recetaSeleccionada.nombre}</h3>
                  <img src={recetaSeleccionada.qrUrl} alt={`QR de ${recetaSeleccionada.nombre}`} />
                  <a href={recetaSeleccionada.qrUrl} download={`QR-${recetaSeleccionada.nombre}`}>
                    Descargar QR
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecetaList;
