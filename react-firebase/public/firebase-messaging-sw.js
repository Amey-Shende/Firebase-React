/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyD82j7xycnihCXVIUu1e3MWjmNLCRgBwNU",
    authDomain: "react-demo-ba31d.firebaseapp.com",
    projectId: "react-demo-ba31d",
    storageBucket: "react-demo-ba31d.appspot.com",
    messagingSenderId: "872107481064",
    appId: "1:872107481064:web:b0b2e5be66c78eb9d6365d",
    measurementId: "G-BJEK8ME9P2",
    databaseURL: "https://react-demo-ba31d-default-rtdb.firebaseio.com",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

