import React, { useState } from 'react';
import '../styles/Home.css'; // Asegúrate de crear un archivo CSS separado para los estilos

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "Información de Facturación", content: "Contenido para el paso 1." },
    { id: 2, title: "Método de Pago", content: "Contenido para el paso 2." },
    { id: 3, title: "Finalizar Compra", content: "Contenido para el paso 3." },
    { id: 4, title: "Éxito", content: "Contenido para el paso 4." },
  ];

  return (
    <div className="home-container">
      <div className="content">
        <div className="progress-bar-section">
          {/* Sección de la Barra de Progreso */}
          <div className="progress-bar">
            <section className="step-wizard">
              <ul className="step-wizard-list">
                {steps.map((step) => (
                  <li
                    key={step.id}
                    className={`step-wizard-item ${step.id === currentStep ? "current-item" : ""}`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <span className="progress-count">{step.id}</span>
                    <span className="progress-label">{step.title}</span>
                  </li>
                ))}
              </ul>
              <div className="relative h-2 bg-muted rounded-full">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </section>
          </div>

          {/* Sección de la Información del Paso */}
          <div className="step-info">
            <h3 className="text-2xl font-bold mb-4">
              {steps.find((step) => step.id === currentStep)?.title}
            </h3>
            <p className="text-muted-foreground">
              {steps.find((step) => step.id === currentStep)?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
