// app/layout.js (replaces _app.js in the App Router)
import '../styles/globals.css';
import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Thursday Club',
  description: 'Thursday',
  icons: {
    icon: "/icons/icon-512x512.png", // Favicon
    apple: "/icons/icon-180x180.png", // Apple touch icon for iOS home screen
  },
  manifest: "/manifest.json", // Link to your Web App Manifest
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add mobile-web-app-capable tags manually */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* You can still manually add theme-color here if needed */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="app" >
        <div>
        <nav style={{paddingBottom:'20px', paddingTop:'20px'}}>
          {/* Global navigation or other components */}
          <ul>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <li style={{color:'white', marginLeft:'0px', marginBottom:'15px', fontFamily:'arial', fontWeight:'bolder', fontSize:'1.2rem', marginRight:'0px'}}>Bobby and Ken&apos;s Thursday Club</li>
            </div>
            <details style={{ textAlign: 'center', marginBottom: '10px' }}>
              <summary style={{color:'yellow', cursor: 'pointer', fontSize: '1.2rem', fontFamily:'arial', fontSize:'0.7rem'}}></summary>
                <div style={{ marginLeft: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    className='uk-pic'
                    src="/team.PNG"
                    alt="Portfolio Image"
                    width={300}
                    height={150}
                    display='priority'
                    style={{ marginLeft: '0px', marginBottom: '10px', borderRadius: '8px' }}
                  />
                </div>
          </details>
            <li style={{fontFamily:'arial', marginLeft:'10px'}}><a href="/">Home</a></li>
            <li style={{fontFamily:'arial', marginLeft:'20px'}} ><a href="/create">Create Post</a></li>
            <li style={{fontFamily:'arial', marginLeft:'20px'}} ><a href="https://event-reg-app.vercel.app/">Registration</a></li>
          </ul>
        </nav>
        {children} {/* This renders the specific page content */}
        </div>
      </body>
    </html>
  );
}

