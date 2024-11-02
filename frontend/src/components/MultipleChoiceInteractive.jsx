import React, { useEffect, useState } from "react";
import "../styles/MultipleChoice.css";

function MultipleChoiceInteractive({ item, onComplete }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [completed, setCompleted] = useState(false);
    let description = item.description.split("&&");

    useEffect(() => {
        setSelectedOption(null);
        setFeedback("");
        setCompleted(false);
    }, [item]);

    const handleOptionSelect = (option) => {
        if (completed) return;
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
            onComplete(); // Llamar a onComplete solo cuando el ejercicio esté completado
        }
    }, [completed]);

    return (
        <div className="multiple-choice-container">
            <h2 className="title">{item.title}</h2>
            <p className="description">
                {description.map((paragraph, index) => (
                    <span key={index}>{paragraph}<br /></span>
                ))}
            </p>
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
            {completed && (
                <button onClick={onComplete} className="continue-button">Continuar</button>
            )}
        </div>
    );
}

export default MultipleChoiceInteractive;
