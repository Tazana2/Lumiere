import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../styles/NavBar.css"


function NavBar() {
    const { isAuthorized } = useContext(AuthContext)
    const navigate = useNavigate()

    const goToLoginRegister = () => {
        return navigate("/login-register")
    }

    const toggleNav = () => {
        document.querySelector(".nav-links").classList.toggle("open")

        const isOpen = document.querySelector(".nav-links").classList.contains("open")
        document.querySelector(".nav-menu-btn i").setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line")
    }

    return (
        <nav>
            <div className="nav-header">
                <div className="nav-logo">
                    <img src="/lumiere.svg" alt="" className="logo-icon" />
                </div>
                <div className="nav-menu-btn" onClick={ toggleNav }>
                    <i className="ri-menu-line"></i>
                </div>
            </div>
            <ul className="nav-links" onClick={ toggleNav }>
                <li><Link to="/">Home</Link></li>
                <li><Link to="#">About</Link></li>
                {
                    !isAuthorized && (
                        <>
                            <li><button onClick={ goToLoginRegister } className="btn">Login or register</button></li>
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