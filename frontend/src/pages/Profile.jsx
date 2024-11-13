import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Profile.css";
import defaultAvatar from "../assets/User_pic.jpg";
import {
    TwitterShareButton,
    WhatsappShareButton,
    TwitterIcon,
    WhatsappIcon,
} from "react-share"

export default function Profile() {
    const [user, setUser] = useState({});
    const [date, setDate] = useState("");
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        // Obtener información del perfil del usuario
        api.get("/users/api/user/profile/")
            .then((res) => {
                setUser(res.data);
                setDate(new Date(res.data.created_at).toDateString());
            })
            .catch((err) => console.log(err));

        // Obtener módulos y sus progresos completados
        api.get("/education/api/modules/")
            .then((res) => res.data)
            .then((modules) => {
                const progressPromises = modules.map((module) =>
                    api.get(`/education/api/modules/${module.id}/progress/`)
                        .then((res) => ({
                            module,
                            progress: res.data.progress_percentage
                        }))
                        .catch((err) => {
                            console.log(err);
                            return null;
                        })
                );

                // Esperar a que todas las promesas de progreso se completen
                Promise.all(progressPromises).then((results) => {
                    const completedModules = results
                        .filter((result) => result && result.progress === 100)
                        .map((result) => ({
                            emoji: "🏆",
                            label: result.module.title
                        }));

                    setAchievements(completedModules);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const profile = {
        avatarUrl: user.avatar_url || defaultAvatar,
        username: user.username || "@username",
        email: user.email,
        bio: user.bio || "User bio goes here.",
    }

    const shareText = `He completado estos módulos en Lumiere: ${achievements.map(a => a.label).join(", ")}! 🎉 Aprende más aquí: `
    const shareUrl = "http://localhost:3000/"

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={profile.avatarUrl} alt={profile.name} className="profile-avatar" />
                    <div className="profile-info">
                        <h1 className="profile-name">{profile.username}</h1>
                        <p className="profile-created-at"><span>Se unió: </span>{date}</p>
                    </div>
                </div>
                <div className="profile-content">
                    <section className="profile-section">
                        <h2 className="section-title">Biografía</h2>
                        <p className="profile-bio">{profile.bio}</p>
                    </section>
                </div>
                <div className="profile-content">
                    <section className="profile-section">
                        <h2 className="section-title">Módulos completados</h2>
                        <div className="achievements-container">
                            {
                                achievements.length > 0 ? achievements.map((achievement, index) => (
                                    <div key={index} className="achievement-card">
                                        <span className="achievement-emoji">{achievement.emoji}</span>
                                        <p className="achievement-label">{achievement.label}</p>
                                    </div>
                                )) : <p>No hay módulos completados</p>
                            }
                        </div>
                    </section>
                    <section className="profile-section">
                        <h2>¡Comparte tus logros!</h2>
                        <div className="share-buttons-container">
                            <TwitterShareButton title={shareText} url={shareUrl}>
                                <TwitterIcon size={50} round />
                            </TwitterShareButton>
                            <WhatsappShareButton title={shareText} url={shareUrl}>
                                <WhatsappIcon size={50} round />
                            </WhatsappShareButton>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    );
}