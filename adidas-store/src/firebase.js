import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-2U5KiTrnOefWfCYJAx3XgIqJqgxIuzc",
  authDomain: "adidas-store-318bb.firebaseapp.com",
  projectId: "adidas-store-318bb",
  storageBucket: "adidas-store-318bb.firebasestorage.app",
  messagingSenderId: "76480732007",
  appId: "1:76480732007:web:bf61e2c4050b86852a2dc2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);