import { useNavigate } from "react-router-dom"
import "../styles/Module.css" 

function Module({mode, module}) {
	const navigate = useNavigate()

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
								<div className="progress-fill" style={{ width: "20%" }}></div>
							</div>
							<p className="progress-text">20% Completo</p>
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