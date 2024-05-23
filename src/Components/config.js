// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODdd SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJX_TZZN_lJxdaJiNaz0ahGx05mcSsNSI",
  authDomain: "expensetracker-fbc2c.firebaseapp.com",
  projectId: "expensetracker-fbc2c",
  storageBucket: "expensetracker-fbc2c.appspot.com",
  messagingSenderId: "484343309542",
  appId: "1:484343309542:web:08b56824e33259e41c0727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider =new GoogleAuthProvider()
export const db =getFirestore(app)


//firebase login
//firebase init
//firebase deploy