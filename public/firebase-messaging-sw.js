importScripts(
    'https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js',
);
importScripts(
    'https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js',
);


const app = firebase.initializeApp({
    apiKey: "AIzaSyDPoyQmlzYGQ7Z9LWTuSHvaYlTuQ-TsKoc",
    authDomain: "estagio-gigabyte.firebaseapp.com",
    projectId: "estagio-gigabyte",
    storageBucket: "estagio-gigabyte.appspot.com",
    messagingSenderId: "220395806731",
    appId: "1:220395806731:web:d507bff64c12805b90e70e",
    measurementId: "G-FT1W86TL67"
});

firebase.messaging(app);



