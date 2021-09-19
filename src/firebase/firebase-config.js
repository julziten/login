import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAujYqlZvl2SFh4SkLbrJ0-UX2nPLEBKnE",
    authDomain: "react-journal-87010.firebaseapp.com",
    projectId: "react-journal-87010",
    storageBucket: "react-journal-87010.appspot.com",
    messagingSenderId: "499133771235",
    appId: "1:499133771235:web:f7943779fcc6e1498f84d6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}