import React, { useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Module.css"

function Module({ first, module, prev_module }) {
	const navigate = useNavigate()
	const [progress, setProgress] = useState(0)
	const [locked, setLocked] = useState(true)

	useEffect(() => {
		api.get(`/education/api/modules/${module.id}/progress/`)
			.then((res) => res.data)
			.then((data) => {
				setProgress(data.progress_percentage)
			})
			.catch((err) => console.log(err))
		
		if (prev_module) {
			api.get(`/education/api/modules/${prev_module.id}/progress/`)
				.then((res) => res.data)
				.then((data) => {
					if (data.progress_percentage === 100) {
						setLocked(false)
					}
				})
				.catch((err) => console.log(err))
		}
	}, [module.id])

	if (first) {
		return (
			<div
					className="progress-card clickable-card"
					role="button"
					tabIndex={0}
					onClick={() => {
						navigate(`/module/${module.id}`)
					}}
				>
					<div className="left-module-part">
						<h2 className="module-progress-title">{module.title}</h2>
						<div className="progress-bar">
							<div
								className="progress-fill"
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<p className="progress-text">{progress}% Completo</p>
					</div>
					<img
						src={`module-imgs/module${module.id}.png`}
						alt="Image"
						className="module-img"
					/>
			</div>
		)
	} else {
		return (
			<>
				{
					locked ? (
						<div className="up-next-item">
							<div className="up-next-icon">🔒</div>
							<p className="up-next-text">{module.title}</p>
							<p className="locked-text">Locked</p>
						</div>
					) : (
						<div
							className="progress-card clickable-card"
							role="button"
							tabIndex={0}
							onClick={() => {
								navigate(`/module/${module.id}`)
							}}
						>
							<div className="left-module-part">
								<h2 className="module-progress-title">{module.title}</h2>
								<div className="progress-bar">
									<div
										className="progress-fill"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<p className="progress-text">{progress}% Completo</p>
							</div>
							<img
								src={`module-imgs/module${module.id}.png`}
								alt="Image"
								className="module-img"
							/>
						</div>
					)
				}
			</>
		)
	}
}

export default Module