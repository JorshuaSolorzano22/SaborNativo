// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4DYeFMxyzqU3MwcQELMzyo-YDjyk_c4c",
  authDomain: "sabor-nativo.firebaseapp.com",
  projectId: "sabor-nativo",
  storageBucket: "sabor-nativo.firebasestorage.app",
  messagingSenderId: "456984330822",
  appId: "1:456984330822:web:55f8bb934aa7c7a845c047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Inicializá Firestore y exportalo
const db = getFirestore(app);

export { db };
