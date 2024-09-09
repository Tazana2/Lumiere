import api from "../api"
import { useState, useEffect } from "react"

function Profile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = () => {
        api.get("/users/api/user/profile/")
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <h1>Profile</h1>
            <p>Username: { user }</p>
            <p>Email: { user.email }</p>
        </>
    )
}

export default Profile