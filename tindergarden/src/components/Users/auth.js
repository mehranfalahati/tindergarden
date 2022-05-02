//import {auth} from "../../Firebase/firebase";
import firebase from "firebase/app"
import 'firebase/auth';
const auth = firebase.auth;



export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }
  
  export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }
  
  export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
  }
  
  export function signOut() {
    return auth().signOut();
  }
  
  export function getCurrentUser() {
    return auth().currentUser;
  }

