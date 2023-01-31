import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage  } from "firebase/storage";
import { getAuth  } from "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBH4ghw92bmZSTilDxJ8lvLsAVxfcTFq9Q",
  authDomain: "react-crud-10f7c.firebaseapp.com",
  projectId: "react-crud-10f7c",
  storageBucket: "react-crud-10f7c.appspot.com",
  messagingSenderId: "53211994189",
  appId: "1:53211994189:web:0340c191510f95a593a404",
  measurementId: "G-LBF531002B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app); 
export const storage = getStorage(app); 