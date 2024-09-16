// /app/api/posts/route.js
import { getPosts, createPost, updatePost } from '@/lib/posts';
import { NextResponse } from 'next/server';
import {MongoClient, ObjectId} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('thursdayclub');
const postsCollection = database.collection('posts');

export async function GET() {
    try {
        const posts = await getPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, content, file } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const post = await createPost({ title, content, file });
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, action, text } = body;

        if (!id || !action) {
            return NextResponse.json({ error: 'Post ID and action are required' }, { status: 400 });
        }

        const updatedPost = await updatePost({ id, action, text });
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        console.log('Deleting post with ID:', id);  // Debug log
        
        if (!id) {
            return new Response('Post ID is required', { status: 400 });
        }

        const objectId = new ObjectId(id);
        const result = await postsCollection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return new Response('Post not found', { status: 404 });
        }

        return new Response('Post deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}    

