import React, { useState, useEffect } from 'react';
import api from '../api'; 
import Post from '../components/Post'; // Verifica que la ruta sea correcta
import "../styles/Forum.css";

function Forum() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api.get("/posts/api/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => console.log(err));
    };

    const deletePost = (id) => {
        api.delete(`/posts/api/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    setPosts(posts.filter((post) => post.id !== id));
                    alert("Post eliminado con éxito");
                } else alert("Error al eliminar el post");
            })
            .catch((err) => alert(err));
    };

    const createPost = (e) => {
        e.preventDefault();
        api.post("/posts/api/", { title, content })
            .then((res) => {
                if (res.status === 201) {
                    setPosts([...posts, res.data]);
    
                    // Limpiar los campos de texto
                    setTitle(""); // Limpiar el campo del título
                    setContent(""); // Limpiar el campo del contenido
                } else alert("Failed to create post");
            })
            .catch((err) => alert(err));
    };
    
    return (
        <div className="body-forum">
            <div className="forum-header-card">
                <h2 className="forum-header-title">Foro</h2>
                <h3 className="forum-header-subtitle">Crea un post!</h3>
            </div>

            <div className="forum-content"> 
                <div className="forum-create-post">
                    <form onSubmit={createPost}>
                        <label className="forum-label" htmlFor="title">T&iacute;tulo:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="forum-input"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <label className="forum-label" htmlFor="content">Contenido:</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            className="forum-textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <input type="submit" value="Publicar" className="forum-btn" /> 
                    </form>
                </div>

                <div className="forum-posts"> 
                    {posts.map((post) => (
                        <div className="forum-post-card" key={post.id}>
                            <Post post={post} onDelete={deletePost} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Forum;
