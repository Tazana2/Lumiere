import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import api from "../api"
import { LoadingIndicator, FindThePair, MultipleChoice, SignDetection, BackButton } from "../components"
import "../styles/LessonDetail.css"

function LessonDetail() {
    const location = useLocation()
    const { idModule, id } = useParams()
    const [lesson, setLesson] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getLessonData()
    }, [])

    const getLessonData = () => {
        api.get(`/education/api/lessons/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setLesson(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                navigate("/404")
            })
    }

    const updateProgressBackend = (newProgress) => {
        api.put(`/education/api/update/${idModule}/${id}/`, {
            progress_percentage: newProgress
        })        
            .then((res) => res.data)
            .catch((err) => console.log(err))
        
            navigate(`/module/${idModule}`)
    }

    const handleNextExercise = () => {
        if (currentExerciseIndex < lesson.content.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1) // Avanza al siguiente ejercicio
        } else {
            updateProgressBackend((1/location.state.lessonLength)*100)
        }
    }

    if (loading) {
        return (
            <div className="exercise-container">
                <LoadingIndicator />
            </div>
        )
    }

    const currentExercise = lesson.content[currentExerciseIndex]

    return (
        <>
            {lesson.content === null ? (
                <h2>La lección no tiene contenido</h2>
            ) : (
                <div className="exercise-container">
                    <div className="lesson-header"> {/* Contenedor flex para el BackButton y el título */}
                        <BackButton /> {/* Botón de regreso */}
                        <div className="lesson-title-card"> {/* Tarjeta para el título */}
                         <h2 style={{ margin: 0 }}>{lesson.title}</h2>
                        </div>
                    </div>
                    <>
                        {currentExercise.type === "find_the_pair" && (
                            <FindThePair item={currentExercise} onComplete={handleNextExercise} />
                        )}
                        {currentExercise.type === "multiple_choice" && (
                            <MultipleChoice item={currentExercise} onComplete={handleNextExercise} />
                        )}
                        {currentExercise.type === "sign_detection" && (
                            <SignDetection item={currentExercise} onComplete={handleNextExercise} />
                        )}
                    </>
                </div>
            )}
        </>
    )
}

export default LessonDetail
