// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb2vg8-8EEPI4-E0zfUd2PuUM1aGqB63c",
  authDomain: "totality-frontend-challenge.firebaseapp.com",
  projectId: "totality-frontend-challenge",
  storageBucket: "totality-frontend-challenge.appspot.com",
  messagingSenderId: "1063082333647",
  appId: "1:1063082333647:web:fe1abcbc20be45ea2aaeba",
  measurementId: "G-QN0JFW9WW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };