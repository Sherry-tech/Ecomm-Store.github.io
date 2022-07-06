// Import the functions you need from the SDKs you need
//import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnQgB3Y93Du029btowk_P4HhnIBQqLyfA",
  authDomain: "ecomm-store-66450.firebaseapp.com",
  projectId: "ecomm-store-66450",
  storageBucket: "ecomm-store-66450.appspot.com",
  messagingSenderId: "794925246933",
  appId: "1:794925246933:web:00d8a86a610493315f355c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

 export{auth,googleAuthProvider}