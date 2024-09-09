import { useState, useEffect } from "react"
import api from "../api"
import { Post } from "../components"
import "../styles/Forum.css"

function Forum() {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")	

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        api.get("/posts/api/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data)
            })
            .catch((err) => console.log(err))
    }

    const deletePost = (id) => {
        api.delete(`/posts/api/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    setPosts(posts.filter((post) => post.id !== id))
                    alert("Post deleted successfully")
                } else alert("Failed to delete post")
            })
            .catch((err) => alert(err))
    }

    const createPost = (e) => {
        e.preventDefault()
        api.post("/posts/api/", {title, content})
        .then((res) => {
            if (res.status === 201) {
                setPosts([...posts, res.data])
                alert("Post created successfully")
            } else alert("Failed to create post")
        })
        .catch((err) => alert(err))
    }

    return (
        <>
            <div className="body">
                <h2>Foro</h2>
                <h3>Crea un Post!</h3>
                <form onSubmit={createPost}>
                    <label htmlFor="title">T&iacute;tulo:</label>
                    <br />
                    <input
                        type="text"
                        name="title" 
                        id="title" 
                        required 
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <br />
                    <label htmlFor="content">Contenido:</label>
                    <br />
                    <textarea 
                        name="content" 
                        id="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value="submit" className="btn" />
                </form>
                { posts.map((post) => 
                    <Post post={post} onDelete={deletePost} key={post.id}/>
                )}
            </div>
        </>
    )
}

export default Forum