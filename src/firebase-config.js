import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBOQ4-myP0p7ICayT54bbw0JYgyr78K9lQ",
  authDomain: "aub-fyp.firebaseapp.com",
  projectId: "aub-fyp",
  storageBucket: "aub-fyp.appspot.com",
  messagingSenderId: "293251775904",
  appId: "1:293251775904:web:7ed16f71ea98e7c01f78c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);