import {firebase} from './firebase-client';

const firebaseCloudMessaging = {
  tokenInlocalforage: async (uid) => {
    const token = await firebase.app().database().ref(`users/${uid}/token`).once('value');
    console.log('returning token:', token.val())
    return token.val()
  },
  init: async function (uid) {
        if ((await this.tokenInlocalforage(uid)) !== null) {
          return false
        }
        try {
          if ((await this.tokenInlocalforage()) !== null) {
            return false
          }
    
          const messaging = firebase.messaging()
          await Notification.requestPermission()
          const token = await messaging.getToken()
    
          return await firebase.app().database().ref(`/users/${uid}/token`).set(token)
          console.log('fcm_token', token)
        } catch (error) {
          console.error(error)
        }
  }
}

export { firebaseCloudMessaging }
