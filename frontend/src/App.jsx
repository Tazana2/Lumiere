import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ModuleDetail, Home, LandingPage, Forum, NotFound, LoginRegister, Profile, LessonDetail, Dictionary , DialogueLesson} from "./pages";
import { ProtectedRoute, NavBar } from "./components";
import { AuthProvider } from "./contexts/AuthContext";

function Logout() {
    localStorage.clear();
    return <Navigate to="/" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <LoginRegister />;
}

function MainApp() {
    const location = useLocation();

    return (
        <>
            {/* Renderiza NavBar solo si no estás en la ruta de LessonDetail */}
            {location.pathname !== `/module/${location.pathname.split("/")[2]}/lessons/${location.pathname.split("/")[4]}` && <NavBar />}
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
                <Route path="/dictionary" element={
                    <ProtectedRoute>
                        <Dictionary />
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
                <Route path="/dialoguelesson" element={
                    <ProtectedRoute>
                        <DialogueLesson />
                    </ProtectedRoute>
                } />
                <Route path="/welcome" element={<LandingPage />} />
                <Route path="/login-register" element={<RegisterAndLogout />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <MainApp />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
