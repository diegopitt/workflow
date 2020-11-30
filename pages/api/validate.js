import admin  from '../../lib/firebase-admin'
import moment from 'moment-timezone'

const validate = async (uid) => {
  const today = moment().tz("America/Mexico_City").day();
  if(uid){
    const user = await admin.auth().getUser(uid)
    const snap = await admin.database().ref(`/eventsByUser/${uid}`).once('value');
    const ebubd = await admin.database().ref(`/eventsByUserByDay/${today}/${uid}`).once('value');
    const favs = await admin.database().ref(`/favotitesByUser/${uid}`).once('value');
    const sntp = await admin.database().ref(`/active/${today}`).once('value');
    const events = { ...sntp.val() }
    const eventsuser = { ...snap.val() }
    const favoritesbyuser = { ...favs.val() }
    const eventByUserByday = ebubd.val() ? { ...ebubd.val() } : null
    const result = {
      data: {
        uid: uid,
        today: today,
        phoneNumber: user ? user.phoneNumber : null,
        emailVerified: user ? user.emailVerified : null,
        todayEvents: events,
        todayUserEvents: eventByUserByday,
        eventsbyuser: eventsuser,
        favoritesbyuser: favoritesbyuser
      },
    };
    console.log('validate reutlt', result)
    return result
  }else{
    const snapshot = await admin.database().ref(`/active/${today}/`).once('value');
    const events = { ...snapshot.val() }
    const result = {
      data: {
        todayEvents: events,
        today: today
      },
    };
    console.log('validate reutlt', result)
    return result
  }
};

export default async (req, res) => {
  try {
    const { uid } = JSON.parse(req.headers.authorization || '{}');
    const result = await validate(uid);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    const result = undefined;
    return res.status(200).send(result);
  }
};