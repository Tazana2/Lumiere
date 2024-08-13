import React from 'react';
import './Features.css';

function Features() {
    return (
        <div className="features">
            <h2>Funciones Destacadas</h2>
            <div className="feature-list">
                <div className="feature-item">
                    <h3>Retroalimentación a tiempo real</h3>
                    <p>Recibe retroalimentación instantánea sobre tus signos mediante avanzados algoritmos de visión por computadora.</p>
                </div>
                <div className="feature-item">
                    <h3>Modo de narración de historias</h3>
                    <p>Aprende Lengua de Señas Colombiana (LSC) de forma inmersiva con historias interactivas y atractivas.</p>
                </div>
                <div className="feature-item">
                    <h3>Rutas de aprendizaje personalizadas</h3>
                    <p>Disfruta de rutas de aprendizaje personalizadas que se adaptan a tu progreso y nivel de habilidad en LSC.</p>
                </div>
            </div>
        </div>
    );
}

export default Features;
