import api from "../api"
import { useState, useEffect } from "react"

function Profile() {
    const [user, setUser] = useState({})
    const [date, setDate] = useState("")

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = () => {
        api.get("/users/api/user/profile/")
            .then((res) => {
                setUser(res.data)
                setDate(new Date(res.data.created_at).toDateString())
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <h1>Profile</h1>
            <p>Username: { user.username }</p>
            <p>Email: { user.email }</p>
            <p>Bio: { user.bio }</p>
            <p>Created at: { date }</p>
        </>
    )
}

export default Profile