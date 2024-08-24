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
        api.get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data); 
                console.log(data)
            })
            .catch((err) => console.log(err))
    }

    const deletePost = (id) => {
        api.delete(`/api/posts/delete/${id}/`)
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
        api.post("/api/posts/", {title, content})
        .then((res) => {
            if (res.status === 201) {
                setPosts([...posts, res.data])
                alert("Post created successfully")
            } else alert("Failed to create post")
        })
        .catch((err) => alert(err))
    }

    return <div>
        <h2>Forum</h2>
        { posts.map((post) => 
            <Post post={post} onDelete={deletePost} key={post.id}/>
        )}
        <h3>Create a Post</h3>
        <form onSubmit={createPost}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                name="title" 
                id="title" 
                required 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea 
                name="content" 
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="submit" />
        </form>
    </div>
}

export default Forum