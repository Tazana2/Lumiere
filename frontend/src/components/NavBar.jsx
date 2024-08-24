import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

function NavBar() {
    const { isAuthorized } = useContext(AuthContext)
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