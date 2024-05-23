// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5KrhAsHMNeEK7mQncWjV1xvHD6ztyx3E",
  authDomain: "estatetopia-15c70.firebaseapp.com",
  projectId: "estatetopia-15c70",
  storageBucket: "estatetopia-15c70.appspot.com",
  messagingSenderId: "894872123573",
  appId: "1:894872123573:web:f37315f6af3ade87dfa6fc",
  measurementId: "G-7PD6W71ZJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);