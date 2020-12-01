import React, { useEffect, useContext } from 'react';
import cookie from 'js-cookie';
import {firebase} from './firebase-client';
import Router from 'next/router';

export const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const logOut = async () => {
    await firebase.auth().signOut()
      .then(() => {
        Router.push('/')
        return null
      })
      .catch((e) => {
        console.error(e)
      })
  }
  const eventWeekDays = (array) => {
    let copy = []
    Object.values(array).forEach(day => {
      switch (day) {
        case 0:
          copy.push('Domingo')
          break;
        case 1:
          copy.push('Lunes')
          break;
        case 2:
          copy.push('Martes')
          break;
        case 3:
          copy.push('Miercoles')
          break;
        case 4:
          copy.push('Jueves')
          break;
        case 5:
          copy.push('Viernes')
          break;
        case 6:
          copy.push('Sabado')
          break;
      }
    });
    return [copy.slice(0, -1).join(', '), copy.slice(-1)[0]].join(copy.length < 2 ? '' : ' y ')
  }
  const unRegisterEvent = async (uid, eventKey) => {
    let updates = {};
    const a = await firebase.app().database().ref(`/events/${eventKey}/dayofweek`).once('value').then((days) => {
      updates[`/eventsByUser/${uid}/${eventKey}`] = null;
      updates[`/usersByEvent/${eventKey}/${uid}`] = null;
      Object.values(days.val()).forEach(day => {
        updates[`/eventsNotification/${day}/${uid}`] = null;
        updates[`/eventsByUserByDay/${day}/${uid}/${eventKey}`] = null;
      })
      return firebase.app().database().ref().update(updates)
    })
  }

  const registerEvent = async (uid, eventKey, data, Phone) => {
    let updates = {};
    const a = await firebase.app().database().ref(`/events/${eventKey}/dayofweek`).once('value').then((days) => {
      updates[`/eventsByUser/${uid}/${eventKey}`] = data;
      updates[`/usersByEvent/${eventKey}/${uid}`] = true;
      Object.values(days.val()).forEach(day => {
        updates[`/eventsByUserByDay/${day}/${uid}/${eventKey}`] = data
        updates[`/eventsNotification/${day}/${uid}`] = { phone: Phone, start: data.start, title: data.title };
      })
      return firebase.app().database().ref().update(updates)
    })
  }
  const saveFavorite = async (uid, eventKey, data) => {
    return firebase.app().database().ref(`/favotitesByUser/${uid}/${eventKey}`).set(data)
  }
  const unFavorite = async (uid, eventKey) => {
    return firebase.app().database().ref(`/favotitesByUser/${uid}/${eventKey}`).set(null)
  }
  const emailLogin = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
      });
  };
  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        cookie.set('uid', user.uid, { expires: 14 })
        //if (Router.pathname !== '/tus_eventos' && Router.pathname !== '/favoritos') {Router.push('/')}
      } else {
        cookie.remove('uid');
      }
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);
  return <UserContext.Provider value={{ emailLogin, eventWeekDays, logOut, saveFavorite, unFavorite, registerEvent, unRegisterEvent }}>{children}</UserContext.Provider>;
};
export default UserProvider
export const useUser = () => useContext(UserContext)