// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

//import { initializeApp } from "firebase/app";


//import { getAnalytics } from "firebase/analytics";
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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();



// firebase.initializeApp(config);
export const auth = firebase.auth;
//export const db = firebase.database();
export const fsDb = firebase.firestore();
export const storage = firebase.storage();


// const app = initializeApp(firebaseConfig);
// export const auth = firebase.auth;
// export const db = getFirestore();
// console.log(db);


// export const colUsers = collection(db, 'users');
// export const colEvents = collection(db, 'events');
// //export const auth = getAuth();
// getDocs(colUsers).then((snapshot) => {console.log(Object.keys(snapshot.docs[0]._document.data.value.mapValue))});
// getDocs(colEvents).then((snapshot) => {console.log(snapshot.docs)});
// const analytics = getAnalytics(app);





