// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsBpdwQn8FZust9-f9jFqrhRaNhcVXQRQ",
  authDomain: "kits-group5.firebaseapp.com",
  projectId: "kits-group5",
  storageBucket: "kits-group5.appspot.com",
  messagingSenderId: "1003810008387",
  appId: "1:1003810008387:web:c487ba55ebe9f034b1d3f6",
  measurementId: "G-0RNTGWYSC8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);