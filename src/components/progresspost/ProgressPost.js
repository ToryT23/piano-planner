import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProgressPost.css";

export const ProgressPost = () => {
  const history = useHistory();
  const [progressPost, setProgressPost] = useState([]);

  const loggedInUser = parseInt(localStorage.getItem("piano_user"))

  useEffect(() => {
    fetch(`http://localhost:8088/progressPosts?userId=${loggedInUser}&_expand=user&_expand=song`)
      .then((res) => res.json())
      .then((data) => {
        setProgressPost(data);
      });
  }, []);

  const deletePost = (id) => {
    fetch(`http://localhost:8088/progressPosts/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`http://localhost:8088/progressPosts?userId=${loggedInUser}&_expand=user&_expand=song`)
        .then((res) => res.json())
        .then((data) => setProgressPost(data));
    });
  };

  return (
    <>
      <div>
        <button onClick={() => history.push("/progressPost/create")}>
          Create Post
        </button>
      </div>
      <section className={"cards"}>
          { progressPost.length > 0 ?
        progressPost.map((post) => {
          return (
            <div key={`post--${post.id}`}>
              {" "}
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Delete
              </button>{" "}
              <p> {post.title} </p> <p>{post.feelings} </p>
              <p>{post.song?.name} </p>
              <p>{post.timestamp}</p>
            </div>)
        })
         : (
        "You don't have any post!"
      )}
        </section>
    </>
  );
};
