import React, { useEffect, useState } from "react";
import "../styles/MultipleChoice.css";

function MultipleChoice({ item, onComplete }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [completed, setCompleted] = useState(false);

    // Reiniciar el estado cuando cambia el ejercicio (item)
    useEffect(() => {
        setSelectedOption(null);
        setFeedback("");
        setCompleted(false);
    }, [item]); // Dependencia en el item para reiniciar cuando se cargue un nuevo ejercicio

    const handleOptionSelect = (option) => {
        if (completed) return;  // No permitir más interacciones si ya está completado
        setSelectedOption(option);
    };

    useEffect(() => {
        if (selectedOption === item.correct_option) {
            setFeedback(item.feedback.correct);
            setCompleted(true);
        } else {
            if (selectedOption !== null) {
                setFeedback(item.feedback.incorrect);
            }
        }
    }, [selectedOption]);

    useEffect(() => {
        if (completed) {
            onComplete();  // Llamar a la función onComplete cuando se complete el ejercicio
        }
    }, [completed]);

    return (
        <div className="multiple-choice-container">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <p className="question">{item.question}</p>
            <div className="options-container">
                {item.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={completed}
                        className={selectedOption === option ? "selected button-mc" : "button-mc"}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <p>{feedback}</p>
        </div>
    );
}

export default MultipleChoice;
