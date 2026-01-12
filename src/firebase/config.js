import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABXch0u5IsfDt0kzQER0KXFWlxi0HtNKw",
  authDomain: "stepnext-job-portal.firebaseapp.com",
  projectId: "stepnext-job-portal",
  storageBucket: "stepnext-job-portal.firebasestorage.app",
  messagingSenderId: "25191820418",
  appId: "1:25191820418:web:ad1a339012715fbc3a589b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
