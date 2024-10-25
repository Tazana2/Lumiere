import React, { useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Module.css" 

function Module({mode, module}) {
	const navigate = useNavigate()

	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (mode === "principal") {
			api.get(`/education/api/modules/${module.id}/progress/`)
			.then((res) => res.data)
			.then((data) => {
				setProgress(data.progress_percentage)
			})
			.catch((err) => console.log(err))
		}
	}, [module.id, mode])

	return (
		<>
			{
				mode === "principal" && (
					<>
						<h1 className="progress-title">Mi Progreso</h1>
						<div className="progress-card clickable-card" role="button" tabIndex={0} onClick={() => {
							navigate(`/module/${module.id}`)
						}}>
							<h2 className="progress-subtitle">{ module.title }</h2>
							
							<div className="progress-bar">
								<div className="progress-fill" style={{ width: `${progress}%` }}></div>
							</div>
							<p className="progress-text">{ progress }% Completo</p>
						</div>
					</>
					
				)
			}
			{
				mode === "locked" && (
					<div className="up-next-item">
						<div className="up-next-icon">🔒</div>
						<p className="up-next-text">{ module.title }</p>
						<p className="locked-text">Locked</p>
					</div>
				)
			}
		</>
	)
}

export default Module