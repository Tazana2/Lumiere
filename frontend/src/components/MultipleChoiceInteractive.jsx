import React, { useEffect, useState } from "react";
import "../styles/MultipleChoiceInteractive.css";


function MultipleChoiceInteractive({ item, onComplete }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [completed, setCompleted] = useState(false);
    let description = item.description.split("&&");

    // Reiniciar el estado cuando cambia el ejercicio (item)
    useEffect(() => {
        setSelectedOption(null);
        setCompleted(false);
    }, [item]); // Dependencia en el item para reiniciar cuando se cargue un nuevo ejercicio

    const handleOptionSelect = (option) => {
        if (completed) return;  // No permitir más interacciones si ya está completado
        setSelectedOption(option);
    };

    useEffect(() => {
        if (selectedOption === item.correct_option) {
            setCompleted(true);
        } else {
            if (selectedOption !== null) {
            }
        }
    }, [selectedOption]);

    useEffect(() => {
        if (completed) {
            onComplete();  // Llamar a la función onComplete cuando se complete el ejercicio
        }
    }, [completed]);

    return (
        <div className="multiple-choice-container-interactive">
            <h2 className="title-interactive">{item.title}</h2>
            <p className="description-interactive">
                {
                    description.map((paragraph, index) => (
                        <span key={index}>
                            {paragraph}
                            <br />
                        </span>
                    ))
                }
            </p>
            {item.image && <img src={item.image} alt="Exercise Illustration" className="exercise-image" />}
            {item.video && <div className="video_mp_wrapper"><video className="video_multiplechoce" loop muted autoPlay> <source src={item.video} type="video/mp4"/>Tu navegador no soporta la etiqueta video.</video> </div> }
            <p className="question">{item.question}</p>
            <div className={item.option_type === "images" ? "options-container-imgs" : "options-container"}>
                {item.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={completed}
                        className={selectedOption === option ? "selected button-mc" : "button-mc"}
                    >
                        {
                        option.includes("/") ? (
                            <img src={option} alt="imagen" />
                        ) : (
                            option
                        )
                        }

                        {
                        option.includes("mp4") ? (
                            <video className="video_multiplechoce" loop muted autoPlay> <source src={option} type="video/mp4" />Tu navegador no soporta la etiqueta video.</video>
                        ) : (
                            <div></div>
                        )
                        }   

                    </button>
                    
                ))}
            
            </div>
        </div>
    );
}

export default MultipleChoiceInteractive;
