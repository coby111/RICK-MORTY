// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAg44LXWZlHpnzsVbZ47TVrS1HavcyU_Uk",
  authDomain: "auth-rick-cbe95.firebaseapp.com",
  projectId: "auth-rick-cbe95",
  storageBucket: "auth-rick-cbe95.appspot.com",
  messagingSenderId: "216853438015",
  appId: "1:216853438015:web:5089d656912ff9fb01e28a",
  measurementId: "G-HCWT3253JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);