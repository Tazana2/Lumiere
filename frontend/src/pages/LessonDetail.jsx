import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api"
import { LoadingIndicator, FindThePair, MultipleChoice } from "../components"
import "../styles/LessonDetail.css"

function LessonDetail() {
    const { id } = useParams()
    const [lesson, setLesson] = useState(null)
    const [loading, setLoading] = useState(true)
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

    if (loading) {
        return (
            <div className="exercise-container">
                <LoadingIndicator />
            </div>
        )
    }

    return (
        <>
            {
                lesson.content === null ? (
                <h2>La lección no tiene contenido</h2>
                ) : (
                    <>
                    <div className="exercise-container">
                        <h2>{lesson.title}:</h2>
                        {
                            lesson.content.map((item, index) => (
                                <>
                                {
                                    item.type === "find_the_pair" && (
                                        <FindThePair key={index} item={item} />
                                    )
                                }
                                {
                                    item.type === "multiple_choice" && (
                                        <MultipleChoice key={index} item={item} />
                                    )
                                }
                                </>
                            ))
                        }
                    </div>
                    </>
                )
            }
        </>
    )
}

export default LessonDetail
