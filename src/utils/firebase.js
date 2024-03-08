// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb_w7u2XgwS6w6M_qSeF74oy-2fP_IOnU",
  authDomain: "netflix-gpt-ffa88.firebaseapp.com",
  projectId: "netflix-gpt-ffa88",
  storageBucket: "netflix-gpt-ffa88.appspot.com",
  messagingSenderId: "418044459400",
  appId: "1:418044459400:web:01a3bc7c477ad5849d223d",
  measurementId: "G-JRLVPMW86Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();