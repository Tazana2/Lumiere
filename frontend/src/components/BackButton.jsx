import { useNavigate } from "react-router-dom"
import "../styles/BackButton.css"
import arrowImage from "../assets/arrow.png"

function BackButton() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/")
    }

    return (
        <button onClick={handleBack} className="back-button">
            <img src={arrowImage} alt="Back" />
        </button>
    )
}

export default BackButton
