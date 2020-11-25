import React from 'react';
import Head from 'next/head';
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

  return (
    <React.Fragment>
      <Head>
        <title>Wind Fire</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>
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
        Authorization: JSON.stringify({ uid: uid }),
      };
      const dev = process.env.NODE_ENV === 'development';
      const server = dev ? 'http://localhost:3000/' : 'https://wind-fire.vercel.app/';
      const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
      console.log('_app.js from validate', { ...result, ...appProps })
      return { ...result, ...appProps };
    } catch (e) {
      console.log(e);
    }
  return { ...appProps };
};