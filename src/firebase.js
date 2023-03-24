import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA6jXw-vy_EmY0QXaL2WTo74XQjMe2K5D0",
  authDomain: "convin-24841.firebaseapp.com",
  projectId: "convin-24841",
  storageBucket: "convin-24841.appspot.com",
  messagingSenderId: "730751857999",
  appId: "1:730751857999:web:25df65118fc8111d16413a",
  measurementId: "G-58XMJ4DWV2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);