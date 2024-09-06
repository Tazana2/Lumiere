import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "./LoadingIndicator"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import "../styles/Form.css"

function Form({route, method}) {
    const { setIsAuthorized } = useContext(AuthContext)
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const className = method === "login" ? "form-container sign-in" : "form-container sign-up"
    const ass = method === "login" ? true : false
    const title = method === "login" ? "Iniciar Sesión" : "Crear Cuenta"
    const spanText = method === "login" ? "Ingresa tu usuario y contraseña" : "Ingresa tus datos para registrarte"
    const btnText = method === "login" ? "Inicia Sesión" : "Regístrate"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            if (method === "login") {
                const response = await api.post(route, { username, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                setIsAuthorized(true)
                navigate("/")
            } else {
                const response = await api.post(route, { username, email, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")
            }
        } catch (error) {
            let message = ""
            try {
                const errors = JSON.parse(error.response.request.response)
                for (let key in errors) {
                    message += `${key}: ${errors[key]}\n`
                }
            } catch{
                message = "Network Error"
            }
            alert(message)
        } finally {
            setLoading(false)
            setUserName("")
            setPassword("")
            setEmail("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            {
                ass && 
                <div>
                    <h1>{ title }</h1>
                    <span>{ spanText }</span>
                    <input 
                        className="form-input" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username" 
                    />
                    { method === "register" && 
                    <input 
                        className="form-input" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    /> }
                    <input 
                        className="form-input" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                    />
                    { loading &&  <LoadingIndicator /> }
                    <button className="form-button" type="submit">
                        { btnText }
                    </button>
                </div>
            }
            {
                !ass &&
                <div>
                    <h1>{ title }</h1>
                    <span>{ spanText }</span>
                    <input 
                        className="form-input" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username" 
                    />
                    { method === "register" && 
                    <input 
                        className="form-input" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    /> }
                    <input 
                        className="form-input" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                    />
                    { loading &&  <LoadingIndicator /> }
                    <button className="form-button" type="submit">
                        { btnText }
                    </button>
                </div>
            }
        </form>
    )
}

export default Form