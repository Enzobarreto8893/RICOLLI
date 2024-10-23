import React, { useState } from 'react';

const RecetaForm = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [fecha, setFecha] = useState('');
  const [hecho, setHecho] = useState('');
  const [imagenFile, setImagenFile] = useState(null); // Estado para la imagen
  const [qrUrl, setQrUrl] = useState(''); // Estado para la URL del código QR
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('ingredientes', ingredientes);
    formData.append('fecha', fecha);
    formData.append('hecho', hecho);
    formData.append('imagen', imagenFile); // La imagen seleccionada
    formData.append("QR",qrUrl); // Agregar la URL del código QR
    // Verificar si los datos están correctamente agregados a FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Esto imprimirá cada clave y valor de formData
    }
  
    try {
      const response = await fetch('http://localhost:3000/recetas', {
        method: 'POST',
        body: formData, // Enviar como FormData
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar receta');
      }
  
      const data = await response.json();
      console.log('Receta agregada:', data);
      onClose(); // Cierra el modal después de agregar la receta
    } catch (error) {
      console.error('Error agregando receta:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <label>Descripción:</label>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <label>Ingredientes:</label>
      <input
        type="text"
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
        required
      />

      <label>Fecha:</label>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />

      <label>Hecho por:</label>
      <input
        type="text"
        value={hecho}
        onChange={(e) => setHecho(e.target.value)}
        required
      />

      <label>Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagenFile(e.target.files[0])} // Guardar el archivo de imagen
      />

      <button type="submit">Agregar Receta</button>
    </form>
  );
};

export default RecetaForm;
