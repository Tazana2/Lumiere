import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MultipleChoiceInteractive, MultipleChoice, SignDetection, FindThePair } from "../components";
import "../styles/DialogueLesson.css";

function DialogueLesson() {
    const [lesson, setLesson] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [completedItems, setCompletedItems] = useState([]); // Para almacenar diálogos y ejercicios completados
    const { lessonId } = useParams(); // Supongamos que tienes un parámetro de ruta para la lección
    const navigate = useNavigate();

    useEffect(() => {
        // Carga el JSON desde una ruta basada en `lessonId`
        fetch(`/interactiveLesson.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar la lección.");
                }
                return response.json();
            })
            .then((data) => {
                setLesson(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error cargando la lección:", error);
                navigate("/404");
            });
    }, [lessonId, navigate]);

    const handleNext = () => {
        if (currentIndex < lesson.content.length - 1) { // Cambia la condición para verificar si hay más contenido
            const nextItem = lesson.content[currentIndex];
            setCompletedItems((prev) => [...prev, nextItem]); // Agregar el elemento actual a la lista de completados
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleRestart = () => {
        // Reiniciar la lección recargando la página
        window.location.reload();
    };

    const handleExit = () => {
        // Redirigir al usuario a la página de inicio
        navigate("/");
    };

    if (loading) {
        return <p>Cargando lección...</p>;
    }

    const isExercise = (item) => item.type === "multiple_choice" || item.type === "sign_detection" || item.type === "find_the_pair";

    return (
        <div className="dialogue-lesson-container">
            <h2 className="lesson-title">{lesson.title}</h2>
            {completedItems.map((item, index) => {
                if (item.type === "dialogue") {
                    return (
                        <div key={index} className="dialogue-item">
                            <img src={`usersicon/user${lesson.participants.find(p => p.id === item.speakerId).id}.png`} alt="Avatar" />
                            <p>
                                <strong>{lesson.participants.find(p => p.id === item.speakerId).name}:</strong> {item.text}
                            </p>
                        </div>
                    );
                }
                return null;
            })}
            {currentIndex < lesson.content.length && (
                <div className="next-item-container">
                    {lesson.content[currentIndex].type === "dialogue" && (
                        <div className="dialogue-item">
                            <img src={`usersicon/user${lesson.participants.find(p => p.id === lesson.content[currentIndex].speakerId).id}.png`} alt="Avatar" />
                            <p>
                                <strong>{lesson.participants.find(p => p.id === lesson.content[currentIndex].speakerId).name}:</strong> {lesson.content[currentIndex].text}
                            </p>
                        </div>
                    )}
                    {lesson.content[currentIndex].type === "multiple_choice" && (
                        <MultipleChoiceInteractive item={lesson.content[currentIndex]} onComplete={handleNext} />
                    )}
                    {lesson.content[currentIndex].type === "sign_detection" && (
                        <SignDetection item={lesson.content[currentIndex]} onComplete={handleNext} />
                    )}
                    {lesson.content[currentIndex].type === "find_the_pair" && (
                        <FindThePair item={lesson.content[currentIndex]} onComplete={handleNext} />
                    )}
                </div>
            )}
            
            {/* Muestra el botón "Continuar" si no es el último índice y no es un ejercicio */}
            {currentIndex < lesson.content.length - 1 && !isExercise(lesson.content[currentIndex]) && (
                <button onClick={handleNext} className="continue-button">Continuar</button>
            )}

            {/* Si es el último elemento, muestra los botones de reiniciar y salir */}
            {currentIndex === lesson.content.length - 1 && (
                <div className="end-buttons">
                    <button onClick={handleRestart} className="restart-button">Reiniciar</button>
                    <button onClick={handleExit} className="exit-button">Salir</button>
                </div>
            )}
        </div>
    );
}

export default DialogueLesson;
