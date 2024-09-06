import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Progress.css'; 

export default function Progress() {
  const navigate = useNavigate();

  return (
    <div className="progress-container">
      <h1 className="progress-title">Mi Progreso</h1>
      
      <div className="progress-card">
        <h2 className="progress-subtitle">Lenguaje de señas básico</h2>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '20%' }}></div>
        </div>
        <p className="progress-text">20% Completo</p>
        
        <div className="topics-container">
          <div 
            className="topic-completed clickable-topic" 
            onClick={
              () => {
                navigate("/modules")
              }
            }
            role="button"
            tabIndex={0}
          >
            <span>Saludos</span>
            <span className="completed-tag">Completado</span>
          </div>
          <div className="topic">Frases básicas</div>
          <div className="topic">Numeros</div>
          <div className="topic">Colores</div>
          <div className="topic">Familia</div>
        </div>
      </div>
      
      <h2 className="progress-subtitle">Siguiente</h2>
      
      <div className="up-next-container">
        <div className="up-next-item">
          <div className="up-next-icon">🧳</div>
          <p className="up-next-text">Viaje</p>
          <p className="locked-text">Locked</p>
        </div>
        <div className="up-next-item">
          <div className="up-next-icon">🥩</div>
          <p className="up-next-text">Comida</p>
          <p className="locked-text">Locked</p>
        </div>
        <div className="up-next-item">
          <div className="up-next-icon">✏️</div>
          <p className="up-next-text">Fundamentos de gramática</p>
          <p className="locked-text">Locked</p>
        </div>
      </div>
    </div>
  );
}
