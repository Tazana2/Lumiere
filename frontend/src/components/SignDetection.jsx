import React, { useEffect, useState } from 'react';
import "../styles/SignDetection.css";

function SignDetection({ item, onComplete }) {
    const [prediction, setPrediction] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);  // Estado para saber si la predicción fue correcta

    // Función para obtener la predicción actual
    const fetchPrediction = async () => {
        try {
            const response = await fetch('http://localhost:8000/get_prediction/');
            const data = await response.json();
            setPrediction(data.prediction);  // Actualiza el estado con la predicción
        } catch (error) {
            console.error('Error al obtener la predicción:', error);
        }
    };

    // Llama a fetchPrediction cada segundo para actualizar la predicción
    useEffect(() => {
        const interval = setInterval(() => {
            fetchPrediction();
        }, 1000);  // Actualiza la predicción cada segundo

        return () => clearInterval(interval);  // Limpia el intervalo al desmontar el componente
    }, []);

    // Verifica si la predicción coincide con el valor esperado
    useEffect(() => {
        if (prediction === item.sign_to_detect) {
            setIsCorrect(true);  // Marca el ejercicio como correcto si la predicción es la correcta
        }
    }, [prediction, item.sign_to_detect]);

    return (
        <div className="sign-detection-container">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <img src="http://localhost:8000/video_feed/" alt="Feed de Video" className='sign-video'/>
            <h2 className='actual-prediction'>Predicción Actual: {prediction}</h2>
            {isCorrect ? (
            <div className='sr-feedback'>
                <p className="feedback">{item.correct}</p>
                <button onClick={onComplete} className="continue-signal-button">Continuar</button>
            </div>
            ) : (
            <p className="instructions">{item.instructions}</p>
            )}
        </div>
    );
}

export default SignDetection;