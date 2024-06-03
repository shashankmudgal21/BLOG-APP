// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-blog-8847c.firebaseapp.com",
  projectId: "mern-blog-8847c",
  storageBucket: "mern-blog-8847c.appspot.com",
  messagingSenderId: "422633736254",
  appId: "1:422633736254:web:a2ed37819b405d9101a96f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);