import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


export const ProgressPostForm = () => {
    const [songs, updateSongs] = useState([])
    const [post, updatePost] = useState({})
    const history = useHistory()

    useEffect( () => {
        fetch("http://localhost:8088/songs/")
        .then(res=>res.json())
        .then(data=>updateSongs(data))
    },[])


    const savePost = (event) => {
        

        const newPost = {
            userId: parseInt(localStorage.getItem("piano_user")),
            title: post.title,
            timestamp: post.timestamp,
            feelings: post.feelings,
            songId: post.songId
        }

        event.preventDefault()

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)  
    }
    return fetch("http://localhost:8088/progressPosts", fetchOption)
            .then(() => {
                history.push("/progressPost")
            })
}




    return(
        <>
        <form className="PostForm">
        <h2 className="Form__title">Create A Post</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    required autoFocus
                    
                    type="text"
                    className="form-control"
                    placeholder="Enter Title"
                    onChange={
                        event => {
                            const copy = {...post}
                            copy.title = event.target.value
                            updatePost(copy)
                        }}
                  />
            </div>
            <div className="form-group">
                <label htmlFor="songId">Song</label>
                <select
                    onChange={
                        event => {
                            const copy = {...post}
                            copy.songId = parseInt(event.target.value)
                            updatePost(copy)
                        }}>
                            <option value="0"> Select A Song </option>
                 {songs.map(song => <option key={`location--${song.id}`} value={song.id}>{song.name} </option>)}
                    </select>
            </div>

            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    required autoFocus
                    type="date" 
                    className="form-control"
                    onChange={
                        event => {
                            const copy = {...post}
                            copy.timestamp = event.target.value
                            updatePost(copy)
                        }}
                  />
                    
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                    <label htmlFor="Feelings"> Feelings:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How do you feel?"
                        onChange={
                            event => {
                                const copy = {...post}
                                copy.feelings = event.target.value
                                updatePost(copy)
                            }}
                     />
                </div>
           
        </fieldset>
        <button className="btn btn-primary"  onClick={savePost}>
            Post It!
        </button>
 
    </form>
        
        </>
    )
}