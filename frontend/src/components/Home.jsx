import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Archivo de estilos

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src="logo.png" alt="Logo Ricolli" className="logo" />
      </header>

      <section className="hero-section">
        <img src="path_to_image.jpg" alt="Productos Libres de Gluten" className="hero-image" />
        <div className="hero-text">
          <h1>Alimentos 100% Libres de Gluten</h1>
          <Link to="/productos" className="hero-button">Ver productos</Link>
        </div>
      </section>

      <section className="about-section">
        <img src="path_to_about_image.jpg" alt="Sobre Nosotros" className="about-image" />
        <div className="about-text">
          <h2>Sobre nosotros</h2>
          <p>Te contamos nuestra historia y cómo se creó Ricolli.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
