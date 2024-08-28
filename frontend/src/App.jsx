import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, LandingPage, Forum, NotFound, LoginRegister } from "./pages";
import { ProtectedRoute, NavBar } from "./components";
import { AuthProvider } from "./contexts/AuthContext";

function Logout() {
    localStorage.clear()
    return <Navigate to="/"/>
}

function RegisterAndLogout() {
    localStorage.clear()
    return <LoginRegister />
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/welcome" element={ <LandingPage /> } />
                    <Route path="/login-register" element={ <RegisterAndLogout /> } />
                    <Route path="/logout" element={ <Logout /> } />
                    <Route path="/forum" element={
                        <ProtectedRoute>
                            <Forum />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={ <NotFound /> } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;