import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBpo9Nu6omduus59vVsXO-aRrFnEDi4dC4",
    authDomain: "todo-react-app-db44b.firebaseapp.com",
    databaseURL: "https://todo-react-app-db44b.firebaseio.com",
    projectId: "todo-react-app-db44b",
    storageBucket: "todo-react-app-db44b.appspot.com",
    messagingSenderId: "841241284317",
    appId: "1:841241284317:web:8a0a90eabac41d41fad534"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();