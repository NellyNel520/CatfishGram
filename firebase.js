import * as firebase from 'firebase/compat'
import "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBPxD3wB9rjxV3YasRIfVSjYaxNLOlQkGA",
  authDomain: "instagramclone-rn-84b73.firebaseapp.com",
  projectId: "instagramclone-rn-84b73",
  storageBucket: "instagramclone-rn-84b73.appspot.com",
  messagingSenderId: "420542533168",
  appId: "1:420542533168:web:223fa88451eae7622d67f5"
};



// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const auth = firebase.auth()

const db = firebase.firestore()
 
const storage = getStorage();


export  {firebase, auth, db, storage}