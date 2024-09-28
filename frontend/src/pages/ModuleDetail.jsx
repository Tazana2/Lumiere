import api from "../api"
import { useParams, useNavigate } from "react-router-dom"
import { LoadingIndicator } from "../components"
import { useEffect, useState } from "react"

function ModuleDetail() {
    const { idModule } = useParams()
    const [module, setModule] = useState(null)
    const [lessons, setLessons] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        // Get module data
        api.get(`/education/api/modules/${idModule}/`)
            .then((res) => res.data)
            .then((data) => {
                setModule(data)
            })
            .catch((err) => console.log(err))
        
        // Get lessons data
        api.get(`/education/api/modules/${idModule}/lessons`)
            .then((res) => res.data)
            .then((data) => {
                setLessons(data)
            })
            .catch((err) => console.log(err))
    }

    if (!module) {        
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
                    <h1>{ module.title }</h1>
                    <p>{ module.description }</p>
                </div>
				<div className="module-levels">
                    {
                        lessons.length === 0 && <h2>No hay lecciones disponibles</h2>
                    }
					{lessons.map((lesson, index) => (
						<div key={index} className="module-level">
							<span className="module-level-name">{lesson.title}</span>
							<button className="module-start-button" onClick={(e) => {
								e.stopPropagation() 
								navigate(`lessons/${lesson.id}`)
							}}>Iniciar</button>
						</div>
					))}
				</div>
			</div>
        </>
    )
}

export default ModuleDetail