import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Forum from "./pages/Forum"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginRegister from "./pages/LoginRegister"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login-register" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <LoginRegister />
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/login-register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forum" element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
