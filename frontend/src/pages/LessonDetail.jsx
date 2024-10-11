import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { LoadingIndicator, FindThePair, MultipleChoice } from "../components";
import "../styles/LessonDetail.css";

function LessonDetail() {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0); // Nuevo estado para controlar el ejercicio actual
    const navigate = useNavigate();

    useEffect(() => {
        getLessonData();
    }, []);

    const getLessonData = () => {
        api.get(`/education/api/lessons/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setLesson(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                navigate("/404");
            });
    };

    const handleNextExercise = () => {
        if (currentExerciseIndex < lesson.content.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1); // Avanza al siguiente ejercicio
        } else {
            alert("¡Has completado la lección!"); // Mensaje cuando se completan todos los ejercicios
            // Aquí puedes redirigir o realizar alguna otra acción si es necesario.
        }
    };

    if (loading) {
        return (
            <div className="exercise-container">
                <LoadingIndicator />
            </div>
        );
    }

    const currentExercise = lesson.content[currentExerciseIndex]; // Mostrar el ejercicio actual

    return (
        <>
            {lesson.content === null ? (
                <h2>La lección no tiene contenido</h2>
            ) : (
                <div className="exercise-container">
                    <h2>{lesson.title}:</h2>
                    <>
                        {currentExercise.type === "find_the_pair" && (
                            <FindThePair item={currentExercise} onComplete={handleNextExercise} />
                        )}
                        {currentExercise.type === "multiple_choice" && (
                            <MultipleChoice item={currentExercise} onComplete={handleNextExercise} />
                        )}
                    </>
                </div>
            )}
        </>
    );
}

export default LessonDetail;
