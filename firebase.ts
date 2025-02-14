import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz4rzjQ_Jm3hMHd1IMSbRV7U3u-vhGa4g",
  authDomain: "notes-app-11c2a.firebaseapp.com",
  projectId: "notes-app-11c2a",
  storageBucket: "notes-app-11c2a.firebasestorage.app",
  messagingSenderId: "632080906698",
  appId: "1:632080906698:web:17df0a5e9950b4f64b3733",
  measurementId: "G-MQ2SLKFK5W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore = getFirestore(app)
