// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

// Required for side-effects
//import "firebase/firestore";
// Required for side-effects

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAcXMKF0e6CjUEuICUmyqxINexzTk2Xrbk",
  authDomain: "victor-d505e.firebaseapp.com",
  projectId: "victor-d505e",
  storageBucket: "victor-d505e.appspot.com",
  messagingSenderId: "650714971652",
  appId: "1:650714971652:web:d3d3ec2a3e333cd6eb3f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DbContext = getFirestore(app)