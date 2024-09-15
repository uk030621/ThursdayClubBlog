// /app/api/posts/route.js
import { getPosts, createPost, updatePost } from '@/lib/posts';
import { NextResponse } from 'next/server';

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

