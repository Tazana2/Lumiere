import api from "../api"
import "../styles/Home.css" 
import { Module } from "../components"
import { useState, useEffect } from "react"

export default function Home() {
	const [modules, setModules] = useState([])

	
	useEffect(() => {
		const container = document.querySelector(".progress-container")
		container.classList.add("fade-in") // Añadimos una clase para la animación al cargar
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
			{
				modules.length === 0 ? (
					<h1 className="progress-title">No hay módulos disponibles</h1>
				) : (
					modules[0] &&
					<>
						<Module mode="principal" module={modules[0]} />
						{
							modules.length > 1 && (
								<>
									<h2 className="progress-subtitle">Siguiente</h2>
									<div className="up-next-container">
										{
											modules.slice(1).map((module, index) => (
												<Module key={index} mode="locked" module={module} />
											))
										}
									</div>
								</>
							)
						}
					</>
				)
			}
		</div>
	)
}