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
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login" onClick={() => {
                                    document.getElementById("container").classList.remove("active")
                                }}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className="hidden" id="register" onClick={() => {
                                    document.getElementById("container").classList.add("active")
                                }}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegister