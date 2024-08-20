import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "./LoadingIndicator"
import "../styles/Form.css"

function Form({route, method}) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const title = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            if (method === "login") {
                const response = await api.post(route, { username, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")
            } else {
                const response = await api.post(route, { username, email, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/login-register")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{ title }</h1>
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
            { title }
        </button>
    </form>
}

export default Form