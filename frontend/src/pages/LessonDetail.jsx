import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api"
import { LoadingIndicator } from "../components"

function LessonDetail() {
    const { id, lessonType } = useParams()
    const [lesson, setLesson] = useState(null)
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getLessonData()
        // getExercisesData()
    }, [])

    const getLessonData = () => {
        api.get(`/education/api/lessons/${id}/`)
            .then((res) => res.data)
            .then((data) => setLesson(data))
            .catch((err) => console.log(err))
    }

    // const getExercisesData = () => {
    //     api.get(`/education/api/lessons/${lessonId}/exercises/${lessonType}/`)
    //         .then((res) => res.data)
    //         .then((data) => setExercises(data))
    //         .catch((err) => console.log(err))
    // }

    if (!lesson) {
        return (
            <div className="module-container">
                <LoadingIndicator />
            </div>
        )
    }

    return (
        <>
            <div className="module-container">
                <div className="module-header">
                    <h1>{lesson.title}</h1>
                    <p>{lesson.description}</p>
                </div>
                <div className="module-levels">
                    {
                        exercises.length === 0 && <h2>No hay ejercicios disponibles</h2>
                    }
                    <div className="module-level">
                        <span className="module-level-name">¡Encuentra las parejas!</span>
                        <button className="module-start-button" onClick={(e) => {
                            e.stopPropagation() 
                            navigate("/exercise")
                        }}>Iniciar</button>
                    </div>
                    {/* <h2>Ejercicios</h2>
                    {exercises.length > 0 ? (
                        exercises.map((exercise, index) => (
                            <div key={index} className="exercise-item">
                                <p>{exercise.title || exercise.question || `Ejercicio ${index + 1}`}</p>
                                <button onClick={() => navigate(`/exercise/${exercise.id}`)}>
                                    Empezar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para esta lección.</p>
                    )} */}
                </div>
            </div>
        </>
    )
}

export default LessonDetail
