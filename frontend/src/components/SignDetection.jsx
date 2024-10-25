import React, { useEffect, useState } from "react"
import api from "../api"
import "../styles/SignDetection.css"

function SignDetection({ item, onComplete }) {
	const [prediction, setPrediction] = useState(null)
	const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        let interval

        const startCameraFeed = () => {
            interval = setInterval(() => {
                api.get("/get_prediction/")
                .then((res) => res.data)
                .then((data) => {
                    setPrediction(data.prediction)
                })
                .catch((err) => console.log("Error al obtener la predicción: ", err))
            }, 1000)  // Actualiza la predicción cada segundo
        }

        startCameraFeed()

        return () => {
            // Detener el acceso a la cámara
            clearInterval(interval)
            api.get("/stop_camera/")
                .catch((err) => console.log("Error al detener la cámara: ", err))
        }
    }, [])

	// Verifica si la predicción coincide con el valor esperado
    useEffect(() => {
		if (prediction === item.sign_to_detect) {
			setIsCorrect(true)
		}
    }, [prediction, item.sign_to_detect])

    return (
		<div className="sign-detection-container">
			<h2 className="title">{item.title}</h2>
			<p className="description">{item.description}</p>
			<img src="http://localhost:8000/video_feed/" alt="Feed de Video" className="sign-video"/>
			<h2 className="actual-prediction">Predicción Actual: {prediction}</h2>
			{
				isCorrect ? (
					<div className="sr-feedback">
						<p className="feedback">{item.correct}</p>
						<button onClick={onComplete} className="continue-signal-button">Continuar</button>
					</div>
				) : (
					<p className="instructions">{item.instructions}</p>
				)
			}
		</div>
	)
}

export default SignDetection
