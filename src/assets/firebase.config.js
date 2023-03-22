// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4yAVOGxcwfJQElAi6h2qCwZClO6NKIyg",
  authDomain: "house-marketplace-app-e2771.firebaseapp.com",
  projectId: "house-marketplace-app-e2771",
  storageBucket: "house-marketplace-app-e2771.appspot.com",
  messagingSenderId: "141917958717",
  appId: "1:141917958717:web:89685e97a7e622de027054"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
