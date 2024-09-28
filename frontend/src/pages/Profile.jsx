import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Profile.css";

// Importa la imagen
import defaultAvatar from "../assets/User_pic.jpg";

export default function Profile() {
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    api.get("/users/api/user/profile/")
      .then((res) => {
        setUser(res.data);
        setDate(new Date(res.data.created_at).toDateString());
      })
      .catch((err) => console.log(err));
  };

  const profile = {
    avatarUrl: user.avatar_url || defaultAvatar, // Usa la imagen importada si no hay avatar
    username: user.username || "@username",
    email: user.email,
    bio: user.bio || "User bio goes here.",
  };

  const achievements = [
    { emoji: "🎓", label: "1" },
    { emoji: "💻", label: "2" },
    { emoji: "🌍", label: "3" },
    { emoji: "📚", label: "4" },
    { emoji: "🚴‍♂️", label: "5" },
  ];

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
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <span className="achievement-emoji">{achievement.emoji}</span>
                  <p className="achievement-label">{achievement.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
