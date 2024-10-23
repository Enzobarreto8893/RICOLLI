import React, { useState, useEffect } from 'react';

const MateriaPrimaList = () => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las materias primas
    fetch('http://localhost:3000/materias-primas')
      .then((response) => response.json())
      .then((data) => setMateriasPrimas(data))
      .catch((error) => console.error('Error al obtener materias primas:', error));
  }, []);

  return (
    <div>
      <h2>Materias Primas</h2>
      <ul>
        {materiasPrimas.map((materia) => (
          <li key={materia.id}>
            {materia.nombre} - {materia.proveedor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MateriaPrimaList;
