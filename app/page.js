//app/page.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        axios
            .get('/api/posts')
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(
                'Error fetching posts:', error));
    }, []);

    const handleLike = async (id) => {
        try {
            const response = await axios.put('/api/posts', {
                id, action: 'like'
            });
            setPosts(posts.map(
                (post) => (post._id === id ? response.data : post)));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (id, text) => {
        try {
            const response = await axios.put('/api/posts', {
                id, action: 'comment', text
            });
            setPosts(posts.map(
                (post) => (post._id === id ? response.data : post)));
            setCommentText(''); // Reset comment text after posting
        } catch (error) {
            console.error('Error commenting on post:', error);
        }
    };

    const convertImageToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="home">
            <h2 style={{fontFamily:'arial'}}>Recent Posts</h2>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.file && (
                        <div>
                            <img src={post.file} alt="Post" />
                        </div>
                    )}
                    <p style={{marginBottom:'5px'}} >Likes: {post.likes}</p>
                    <button style={{borderRadius:'6px', padding:'8px'}} onClick={() => handleLike(post._id)}>
                        Like
                    </button>
                    <p style={{marginTop:'30px', marginBottom:'0px'}}>Comments: {post.comments.length}</p>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>
                    <div>
                        <input style={{padding:'8px 5px', fontSize:'17px', borderRadius:'6px', border:'1px solid'}} type="text" placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)} />
                        <button style={{borderRadius:'6px', padding:'8px', marginLeft:'5px'}}
                            onClick={() => handleComment(post._id, commentText)}>
                            Post
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
