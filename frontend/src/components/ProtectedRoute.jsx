import { Navigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import LoadingIndicator from "./LoadingIndicator"

function ProtectedRoute({ children }) {
    const { isAuthorized, auth } = useContext(AuthContext)

    useEffect(() => {
        auth()
    }, [auth])

    if (isAuthorized === null) {
        return <LoadingIndicator />
    }

    if (!isAuthorized) {
        return <Navigate to="/welcome" />
    }

    return children
}

export default ProtectedRoute