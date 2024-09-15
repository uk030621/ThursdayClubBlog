// /lib/posts.js
import mongoose from 'mongoose';

// MongoDB connection URI from .env.local
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Check if the connection to the database is already established to avoid re-connecting
let isConnected = false;

async function connectToDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

// Define post schema and model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    likes: { type: Number, default: 0 },
    comments: [{ text: String }],
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// Functions to interact with the database
export async function getPosts() {
    await connectToDB();
    return Post.find();
}

export async function createPost({ title, content, file }) {
    await connectToDB();
    const post = new Post({ title, content, file });
    return post.save();
}

export async function updatePost({ id, action, text }) {
    await connectToDB();
    if (action === 'like') {
        return Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    } else if (action === 'comment') {
        return Post.findByIdAndUpdate(id, { $push: { comments: { text } } }, { new: true });
    }
}
