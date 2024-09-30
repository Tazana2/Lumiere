import React, { useState } from "react"
import "../styles/MultipleChoice.css"

function MultipleChoice({ item }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [feedback, setFeedback] = useState("")
    const [completed, setCompleted] = useState(false)

    const handleOptionSelect = (option) => {
        if (completed) return  // No permitir más interacciones si ya está completado
        setSelectedOption(option)
    }

    const handleSubmit = () => {
        if (selectedOption === item.correct_option) {
            setFeedback(item.feedback.correct)
            setCompleted(true)
        } else {
            setFeedback(item.feedback.incorrect)
        }
    }

    if (completed) {
        // Aquí se puede agregar una animación o mensaje de actividad completada
    }

    return (
        <div className="multiple-choice-container">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <p className="description, question" >{item.question}</p>
            <div className="options-container">
                {item.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={completed}
                        className={selectedOption === index ? "selected" : ""}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={completed || selectedOption === null}>
                Enviar
            </button>
            <p>{feedback}</p>
            <button 
				className="button continuar"
				disabled={!completed}
                onClick={
                    // Aquí se puede agregar una función para marcar la actividad como completada y continuar a la siguiente
                    console.log("Actividad completada")
                }
			>
				CONTINUAR
			</button>
        </div>
    )
}

export default MultipleChoice