import { jwtDecode } from "jwt-decode"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function NavBar() {
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        auth().catch((error) => {
            console.error(error)
            setIsAuthorized(false)
        })
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.error(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const currentTime = Date.now() / 1000

        if (tokenExpiration < currentTime) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {
                    !isAuthorized && (
                        <>
                            <li><Link to="/login-register">Login or Register</Link></li>
                        </>
                    )
                }
                {
                    isAuthorized && (
                        <>
                            <li><Link to="/forum">Forum</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar