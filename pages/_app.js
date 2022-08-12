// pages/_app.js
import React from 'react';
// UserProvider gives us a signed-in user's context.
import { UserProvider } from '@auth0/nextjs-auth0';

// We add UserProvider to the App component.
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
