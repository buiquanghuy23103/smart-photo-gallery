import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB-Qy1bgEPuEkvQ0hiLch5c7FCD_I5R5DM",
    authDomain: "photogallery-6ea49.firebaseapp.com",
    projectId: "photogallery-6ea49",
    storageBucket: "photogallery-6ea49.appspot.com",
    messagingSenderId: "679116635363",
    appId: "1:679116635363:web:9a893103cdfae7dad799d6"
};

const myFirebase = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = myFirebase.auth();