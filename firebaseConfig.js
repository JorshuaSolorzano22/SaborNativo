// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd5-PlGIHH3qlRTL7S9FifZPikCDw-tN0",
  authDomain: "sabornativo-71963.firebaseapp.com",
  projectId: "sabornativo-71963",
  storageBucket: "sabornativo-71963.firebasestorage.app",
  messagingSenderId: "570051044334",
  appId: "1:570051044334:web:0453cc7fb288fcdf3ce4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Inicializá Firestore y exportalo
const db = getFirestore(app);

export { db };
