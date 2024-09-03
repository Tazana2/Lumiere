import React from 'react';
import '../styles/Module.css'; 

const Module = () => {
  const levels = ['Lección 1', 'Lección 2', 'Lección 3', 'Lección 4'];

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>Saludos 👋</h1>
        <p>Aprende a saludar en lenguaje de señas</p>
      </div>
      <div className="module-levels">
        {levels.map((level, index) => (
          <div key={index} className="module-level">
            <span className="module-level-name">{level}</span>
            <button className="module-start-button">Iniciar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;
