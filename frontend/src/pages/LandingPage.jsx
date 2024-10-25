import { Link, useNavigate } from "react-router-dom"
import "../styles/LandingPage.css"
import { useEffect } from "react"

function LandingPage() {
    const navigate = useNavigate()
    useEffect(() => {
        const scrollRevealOption = {
            distance: "50px",
            origin: "bottom",
            duration: 1000
        }
        ScrollReveal().reveal(".header-container h2", {
            ...scrollRevealOption,
        })
        ScrollReveal().reveal(".header-container h1", {
            ...scrollRevealOption,
            delay: 500,
        })
        ScrollReveal().reveal(".header-container p", {
            ...scrollRevealOption,
            delay: 1000,
        })
        ScrollReveal().reveal(".header-btns", {
            ...scrollRevealOption,
            delay: 1500,
        })
        ScrollReveal().reveal(".header-img", {
            ...scrollRevealOption,
            delay: 1000,
        })
        ScrollReveal().reveal(".steps-card", {
            ...scrollRevealOption,
            interval: 500,
        })
        ScrollReveal().reveal(".explore-card", {
            duration: 1000,
            interval: 500,
        })
    }, [])

    return (
        <>
            <header className="header-container section-container">
                <section className="emptysec"></section>
                <h2><img src="/src/assets/ai.png" alt="bag" />AI Powered</h2>
                <h1>Aprender <span>LSC</span><br /> nunca fue tan fácil </h1>
                <p>
                Lumiere es una plataforma gratuita y libre para el aprendizaje de LCS
                (Lenguaje de Señas Colombiano), que aprovecha la IA y diferentes tecnologías
                para hacer del proceso algo divertido. 
                </p>
                <div className="header-btns">
                    <button className="btn" onClick={
                        () => {
                            navigate("/login-register")
                        }
                    }>Empieza a aprender</button>
                    <Link to="/">
                        <span><i className="ri-play-fill"></i></span>
                        Cómo funciona?
                    </Link>
                </div>

                <img src="/src/assets/sketch.png" alt="header-img" className="header-img" />
            </header>

            <section className="steps">
                <section className="emptysec"></section>
                <div className="steps-container section-container">
                    <h2 className="section-header">
                        Empieza a aprender <span>ahora mismo</span>
                    </h2>
                    <p className="section-description">
                        Empieza un nuevo camino.
                    </p>
                    <div className="steps-grid">
                        <div className="steps-card">
                            <span><i className="ri-user-fill"></i></span>
                            <h4>Crea tu cuenta</h4>
                            <p>
                                Crea tu cuenta en unos pocos pasos y obten acceso gratuito
                                a todos los modulos que hemos preparado para ti. Es rápido y fácil.
                            </p>
                        </div>
                        <div className="steps-card">
                            <span><i className="ri-search-fill"></i></span>
                            <h4>Busca los módulos</h4>
                            <p>
                                Busca los módulos de tu interés para aprender, también puedes iniciar
                                desde 0.
                            </p>
                        </div>
                        <div className="steps-card">
                            <span><i className="ri-emotion-happy-line"></i></span>
                            <h4>Diviertete</h4>
                            <p>
                                Avanza por cada uno de los niveles de los módulos mediante
                                las lecciones que hicimos para ti, podrás observar tu progreso
                                y señas aprendidas.
                            </p>
                        </div>
                        <div className="steps-card">
                            <span><i className="ri-book-open-line"></i></span>
                            <h4>Aprende</h4>
                            <p>
                                Al finalizar tus sesiones, verás que has aprendido al menos algo 
                                nuevo, ¡creemos que eso es lo mejor!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-container explore-container">
                <h2 className="section-header">
                    <span>Variedad de cursos</span> están esperando por ti
                </h2>
                <p className="section-description">
                    Descúbrelos.
                </p>
                <div className="explore-grid">
                    <div className="explore-card">
                        <span><i className="ri-shake-hands-line"></i></span>
                        <h4>Saludos</h4>
                        <p>Aprende a saludar</p>
                    </div>
                    <div className="explore-card">
                        <span><i className="ri-bar-chart-box-fill"></i></span>
                        <h4>Modulo 2</h4>
                        <p>Aprende a</p>
                    </div>
                    <div className="explore-card">
                        <span><i className="ri-megaphone-fill"></i></span>
                        <h4>Modulo 3</h4>
                        <p>Aprende a</p>
                    </div>
                    <div className="explore-card">
                        <span><i className="ri-wallet-3-fill"></i></span>
                        <h4>Modulo 4</h4>
                        <p>Aprende a</p>
                    </div>
                </div>
                <div className="explore-btn">
                    <button className="btn" onClick={
                        () => {
                            navigate("/login-register")
                        }
                    }>Regístrate</button>
                </div>
            </section>

            <footer className="footer">
                <div className="section-container footer-container">
                    <div className="footer-col">
                        <div className="footer-logo">
                            <img src="/src/assets/lumiere.svg" alt="Icono" className="logo-icon" />
                        </div>
                        <p>
                        Nuestra plataforma está pensada para ser gratuita, OpenSource y accesible para cualquiera.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Enláces rápidos</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/">Sobre nosotros</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contáctanos</h4>
                        <ul className="footer-links">
                            <li>
                                <Link to="/">
                                    <span><i className="ri-phone-fill"></i></span> +57 311 5600884
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <span><i className="ri-map-pin-2-fill"></i></span> EAFIT
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bar">
                    <p>Copyright &copy; 2024 Lumiere. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default LandingPage