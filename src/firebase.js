import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH14Hpknc3i9pVc71a3VoWOv82ifLavws",
  authDomain: "project-2-1ffdc.firebaseapp.com",
  databaseURL: "https://project-2-1ffdc-default-rtdb.firebaseio.com",
  projectId: "project-2-1ffdc",
  storageBucket: "project-2-1ffdc.firebasestorage.app",
  messagingSenderId: "175352414713",
  appId: "1:175352414713:web:67152e692b8398fe817d28",
  measurementId: "G-FXZ4WW66WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { app, auth, db };