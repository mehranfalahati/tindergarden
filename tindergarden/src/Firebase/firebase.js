// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
  getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, doc, where, orderBy, serverTimestamp, updateDoc 
} from  "firebase/firestore";

import {
  auth, getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
} from 'firebase/auth'

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcKMpDiEnyCPj2N2hGermLJofyfIpyyYw",
  authDomain: "tindergarden-1508c.firebaseapp.com",
  projectId: "tindergarden-1508c",
  storageBucket: "tindergarden-1508c.appspot.com",
  messagingSenderId: "396906683042",
  appId: "1:396906683042:web:1391cc23d84aaf6ffd95fb",
  measurementId: "G-44K3C3VNXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const colUsers = collection(db, 'users');
const colEvents = collection(db, 'events');
//export const auth = getAuth();
getDocs(colUsers).then((snapshot) => {console.log(snapshot.docs)});
getDocs(colEvents).then((snapshot) => {console.log(snapshot.docs)});
const analytics = getAnalytics(app);





