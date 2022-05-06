// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDcKMpDiEnyCPj2N2hGermLJofyfIpyyYw",
  authDomain: "tindergarden-1508c.firebaseapp.com",
  databaseURL: "gs://tindergarden-1508c.appspot.com",  
  projectId: "tindergarden-1508c",
  storageBucket: "tindergarden-1508c.appspot.com",
  messagingSenderId: "396906683042",
  appId: "1:396906683042:web:1391cc23d84aaf6ffd95fb",
  measurementId: "G-44K3C3VNXS"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth;
export const fsDb = firebase.firestore();
export const storage = firebase.storage();








