// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhoy2okcjPv4uq0Er2MaCWVYdvuaOcmRA",
  authDomain: "bdsabornativo.firebaseapp.com",
  projectId: "bdsabornativo",
  storageBucket: "bdsabornativo.firebasestorage.app",
  messagingSenderId: "848741410744",
  appId: "1:848741410744:web:b7572120a5a29e544a914d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);