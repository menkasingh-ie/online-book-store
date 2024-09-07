// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';
// import firebase from 'firebase'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT2OpjZEsAzrwsDXDAnsDzhcgB-Ede4Xg",
  authDomain: "online-book-store-e1fa8.firebaseapp.com",
  projectId: "online-book-store-e1fa8",
  storageBucket: "online-book-store-e1fa8.appspot.com",
  messagingSenderId: "1087303889208",
  appId: "1:1087303889208:web:ec8da4d522decaa72591cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app)

// Google Authentication
const provider = new GoogleAuthProvider()

export { app, auth, provider };