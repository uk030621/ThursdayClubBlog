// components/Post.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';

function Post({ post }) {
    const [commentInput, setCommentInput] = useState('');

    const handleLike = postId => {
        axios.post(`/lib/posts/like/${postId}`)
            .then(response => {
                // Handle updated post data
            })
            .catch(
                error => console.error('Error liking post:', error));
    };

    const handleAddComment = (postId, commentText) => {
        axios.post(`/lib/posts/comment/${postId}`,
            { text: commentText })
            .then(response => {
                // Handle updated post data
            })
            .catch(
                error => console.error('Error adding comment:', error));
    };

    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.file && (
                <div>
                    <img src={`/uploads/${post.file}`}
                        alt="Post Media" />
                </div>
            )}
            <p>Likes: {post.likes}</p>
            <button
                onClick={() => handleLike(post._id)}>
                Like
            </button>
            <p>Comments: {post.comments.length}</p>
            <ul>
                {post.comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                ))}
            </ul>
            <input type="text" placeholder="Add a comment"
                className="comment-input"
                onChange={(e) => setCommentInput(e.target.value)} />
            <button
                onClick={() => handleAddComment(post._id, commentInput)}
                className="comment-button">
                Add Comment
            </button>
        </div>
    );
}

export default Post;
