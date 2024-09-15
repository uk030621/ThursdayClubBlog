// app/layout.js (replaces _app.js in the App Router)
import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'My Next.js App',
  description: 'A cool Next.js application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app" >
        <div>
        <nav>
          {/* Global navigation or other components */}
          <ul>
            <li style={{color:'white', marginLeft:'10px', fontFamily:'arial'}}>Thursday Club Blog</li>
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create Post</a></li>
          </ul>
        </nav>
        {children} {/* This renders the specific page content */}
        </div>
      </body>
    </html>
  );
}

