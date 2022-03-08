// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMdi5FGYa63HuHE8pIp4xUCFjm4Os7Ilw",
  authDomain: "reelsforu-e2c1f.firebaseapp.com",
  projectId: "reelsforu-e2c1f",
  storageBucket: "reelsforu-e2c1f.appspot.com",
  messagingSenderId: "696878855306",
  appId: "1:696878855306:web:faac3ed9100994c11aa973"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
console.log(storage);
export { auth, storage, db };
export default app;