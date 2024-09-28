import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ModuleDetail, Home, LandingPage, Forum, NotFound, LoginRegister, Profile, LessonDetail } from "./pages"
import { ProtectedRoute, NavBar } from "./components"
import { AuthProvider } from "./contexts/AuthContext"

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
                    <Route path="/forum" element={
                        <ProtectedRoute>
                            <Forum />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/module/:idModule" element={
                        <ProtectedRoute>
                            <ModuleDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/module/:idModule/lessons/:id" element={
                        <ProtectedRoute>
                            <LessonDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/welcome" element={ <LandingPage /> } />
                    <Route path="/login-register" element={ <RegisterAndLogout /> } />
                    <Route path="/logout" element={ <Logout /> } />
                    <Route path="*" element={ <NotFound /> } />
                    <Route path="/404" element={ <NotFound /> } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App