import React, { useEffect } from 'react';
import App from 'next/app'
import cookies from 'next-cookies'
import NProgress from 'nprogress'
import UserProvider from '../lib/userContext'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import '../styles/index.css'
import '../styles/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp(props) {
  const { Component, pageProps, data } = props;
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])
  return (
    <React.Fragment>
      <UserProvider>
        <Component {...{...pageProps, ...data}} />
      </UserProvider>
    </React.Fragment>
  );
}
MyApp.getInitialProps = async (userContext) => {
  const { ctx } = userContext;
  const appProps = await App.getInitialProps(userContext);
  const { uid } = cookies(ctx);
    try {
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ uid }),
      };
      const dev = process.env.NODE_ENV === 'development';
      console.log('here')
      const server = dev ? 'http://localhost:3000/' : 'https://wind-fire.vercel.app/';
      const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
      console.log('_app.js from validate', { ...result, ...appProps })
      return { ...result, ...appProps };
    } catch (e) {
      console.log(e);
    }
  return { ...appProps };
};