import { Form } from "../components"

function LoginRegister() {
    return (
        <>
            <div className="body">
                <div className="container" id="container">
                    <Form route="/api/users/token/" method="login"/>
                    <Form route="/api/users/user/register/" method="register"/>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Bienvenido!</h1>
                                <p>Si ya estás registrado inicia sesión para seguir aprendendiendo</p>
                                <button className="hidden" id="login" onClick={() => {
                                    document.getElementById("container").classList.remove("active")
                                }}>Iniciar Sesión</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>¿Nuevo por aquí?</h1>
                                <p>Regístrate en Lumiere para comenzar a aprender</p>
                                <button className="hidden" id="register" onClick={() => {
                                    document.getElementById("container").classList.add("active")
                                }}>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegister
