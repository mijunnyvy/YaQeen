// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmlreZsY4VxwXsjA6ef1wHwdf8tTG1WtA", // Provided API Key
  authDomain: "yaqeenweb-e4329.firebaseapp.com", // Derived from Project ID
  projectId: "yaqeenweb-e4329", // Provided Project ID
  storageBucket: "yaqeenweb-e4329.appspot.com", // Derived from Project ID
  messagingSenderId: "988374045840", // Provided Messaging Sender ID
  appId: "1:988374045840:web:a9b0c1d2e3f4g5h6i7j8k9", // Replace with your actual App ID from Firebase console
  measurementId: "G-XXXXXXXXXX", // Replace with your actual Measurement ID from Firebase console (optional)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized services
export { auth, db, storage };