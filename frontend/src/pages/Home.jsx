import api from "../api"
import "../styles/Home.css"
import { Module } from "../components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
	const navigate = useNavigate()
	const [modules, setModules] = useState([])

	useEffect(() => {
		const container = document.querySelector(".progress-container")
		container.classList.add("fade-in")
		getModules()
	}, [])

	const getModules = () => {
		api.get("/education/api/modules/")
			.then((res) => res.data)
			.then((data) => {
				setModules(data)
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className="progress-container">
			{modules.length === 0 ? (
				<h1 className="progress-title">No hay módulos disponibles</h1>
			) : (
				<>
					<div
						className="progress-card-interactive clickable-card-interactive"
						role="button"
						tabIndex={0}
						onClick={() => {
							navigate(`/dialoguelesson`)
						}}
					>
						<img
							src="usersicon/user7.png"
							alt="Lección Interactiva"
							className="progress-image-interactive"
						/>
						<div className="card-content-interactive">
							<h2 className="progress-title-interactive">Lección Interactiva</h2>
							<p className="progress-description-interactive">
								Entra para aprender siempre de una manera diferente
							</p>
							<div className="ai-powered-interactive">
								<span className="ai-icon-interactive">🤖</span> Impulsado por IA
							</div>
						</div>
					</div>

					<h1 className="progress-title">Mi Progreso</h1>
					{
						modules.map((module, index) => (
							<>
								{
									index == 0 ? (
										<Module key={index} module={module} first={true}/>
									) : (
										<Module key={index} module={module} prev_module={modules[index-1]}/>
									)
								}
							</>
						))
					}
				</>
			)}
		</div>
	)
}