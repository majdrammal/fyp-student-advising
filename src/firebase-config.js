import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD7auGjqrhpWAtjjgqjNr5RHvlSwjW8WLo",
  authDomain: "eece-502---student-advising.firebaseapp.com",
  projectId: "eece-502---student-advising",
  storageBucket: "eece-502---student-advising.appspot.com",
  messagingSenderId: "334685319231",
  appId: "1:334685319231:web:38f6ab6cb3b7d6dc57088a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);