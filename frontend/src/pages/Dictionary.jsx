import React, { useState, useEffect } from "react";
import "../styles/Dictionary.css";

const Dictionary = () => {
  const [signsData, setSignsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Cargar los datos del JSON
    fetch('../public/assets/dictionary.json')
      .then((response) => response.json())
      .then((data) => setSignsData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  // Filtrar los signos basados en el término de búsqueda
  const filteredSigns = signsData.filter((sign) =>
    sign.sign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador para reproducir el video al hacer hover
  const handleMouseEnter = (e, videoSrc) => {
    const videoElement = e.currentTarget.querySelector('.card__video');
    if (videoElement) {
      videoElement.src = videoSrc;  // Asegura que el src se actualice correctamente
      videoElement.play();
    }
  };

  // Manejador para pausar el video al salir del hover
  const handleMouseLeave = (e) => {
    const videoElement = e.currentTarget.querySelector('.card__video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  return (
    <>
      <div className="dictionary-container">
        <h1 className="title-dictionary">Diccionario de Lengua de Señas</h1>

        {/* Barra de búsqueda */}
        <div className="search-bar-dictionary-container">
        <input
          type="text"
          className="search-bar-dictionary"
          placeholder="Buscar señas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado del término de búsqueda
        />
        </div>

        <section className="hero-section">
          <div className="card-grid">
            {filteredSigns.length > 0 ? (
              filteredSigns.map((sign, index) => (
                <a
                  key={index}
                  className="card"
                  href="#"
                  onMouseEnter={(e) => handleMouseEnter(e, sign.link)}  // Pasar el link correcto
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="card__background">
                    <video className="card__video" loop muted>
                      <source src={sign.link} type="video/mp4" />
                      Tu navegador no soporta la etiqueta video.
                    </video>
                  </div>
                  <div className="card__content">
                    <p className="card__category">SEÑA</p>
                    <h3 className="card__heading">{sign.sign}</h3>
                  </div>
                </a>
              ))
            ) : (
              <p>No se encontraron resultados para "{searchTerm}".</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dictionary;
