import React from "react"
import "../styles/Post.css"

function Post({ post, onDelete }) {
    const formattedDate = new Date(post.date_posted).toLocaleDateString()

    return (
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <hr className="post-divider" /> {/* Línea divisoria */}
            <p className="post-content">{post.content}</p>
            <p className="post-date">Por {post.author} el {formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(post.id)}>
                Eliminar
            </button>
        </div>
    )
}

export default Post
