importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDkiA0_KZCuLkJZyGbN2fY6d2Qt1RaTAxI',
  projectId: 'vida-952b2',
  messagingSenderId: '659328669105',
  appId: '1:659328669105:web:21f3a6c854d354e3c71990',
})
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/timer.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
