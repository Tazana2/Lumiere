import Form from "../components/Form"
import NavBar from "../components/NavBar"

function LoginRegister() {
    return (
        <div>
            <NavBar />
            <Form route="/api/token/" method="login"/>
            <Form route="/api/token/" method="register"/>
        </div>
    )
}

export default LoginRegister