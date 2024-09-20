import React, { useState, useEffect } from "react";
import "../styles/Dictionary.css";

const Dictionary = () => {
  const [signsData, setSignsData] = useState([]);

  useEffect(() => {
    fetch('../public/assets/dictionary.json')
      .then((response) => response.json())
      .then((data) => setSignsData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  // Añadir listeners para los videos una vez que los datos están cargados
  useEffect(() => {
    // Solo añadir los eventos si hay datos cargados
    if (signsData.length > 0) {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        const video = card.querySelector('.card__video');

        card.addEventListener('mouseenter', () => {
          video.play();
        });

        card.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      });
    }
  }, [signsData]); // Ejecuta este efecto cuando `signsData` cambia

  return (
    <>
      <div>Diccionario</div>
      <section className="hero-section">
        <div className="card-grid">
          {signsData.map((sign, index) => (
            <a key={index} className="card" href="#">
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
          ))}
        </div>
      </section>
    </>
  );
};

export default Dictionary;
