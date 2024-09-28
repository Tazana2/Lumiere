import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function Home() {
    return (
        <>
            <div className="body">
                <h1>Home</h1>
                <p>Welcome to the home page! You are currently log in!</p>
            </div>
        </>
    )
}

export default Home