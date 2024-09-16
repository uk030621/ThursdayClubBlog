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
        <nav style={{paddingBottom:'20px', paddingTop:'20px'}}>
          {/* Global navigation or other components */}
          <ul>
            <div>
            <li style={{color:'white', marginLeft:'8px', marginBottom:'15px', fontFamily:'arial', fontWeight:'bolder', fontSize:'1.2rem'}}>Thursday Club Post</li>
            </div>
            <li style={{fontFamily:'arial', marginLeft:'10px'}}><a href="/">Home</a></li>
            <li style={{fontFamily:'arial', marginLeft:'30px'}} ><a href="/create">Create Post</a></li>
          </ul>
        </nav>
        {children} {/* This renders the specific page content */}
        </div>
      </body>
    </html>
  );
}

