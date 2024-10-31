import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../styles/NavBar.css"

function NavBar() {
    const { isAuthorized } = useContext(AuthContext)
    const navigate = useNavigate()

    const toggleNav = () => {
        document.querySelector(".nav-links").classList.toggle("open")

        const isOpen = document.querySelector(".nav-links").classList.contains("open")
        document.querySelector(".nav-menu-btn i").setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line")
    }

    const handleLogoClick = () => {
        window.location.reload() // Recarga la página al hacer clic en el logo
    }

    return (
        <nav className={`nav-container ${isAuthorized ? "logged-in" : ""}`}>
            <div className="nav-header">
                <div className="nav-logo" onClick={handleLogoClick}> {/* Añadir el evento onClick aquí */}
                    <Link to="/">
                        <img src="/src/assets/lumiere.svg" alt="logo" className="logo-icon"/>
                    </Link>
                </div>
                <div className="nav-menu-btn" onClick={toggleNav}>
                    <i className="ri-menu-line"></i>
                </div>
            </div>
            <ul className="nav-links" onClick={toggleNav}>
                {
                    !isAuthorized && (
                        <>
                            <li>
                                <button onClick={ 
                                    () => {
                                        navigate("/login-register")
                                    }
                                } className="btn">Ingresa o reg&iacute;strate</button>
                            </li>
                        </>
                    )
                }
                {
                    isAuthorized && (
                        <>
                            <li><Link to="/forum">Foro</Link></li>
                            <li><Link to="/profile">Mi perfil</Link></li>
                            <li><Link to="/dictionary">Diccionario</Link></li>
                            <li>
                                <button onClick={ 
                                    () => {
                                        navigate("/logout")
                                    }
                                } className="btn">Salir</button>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar