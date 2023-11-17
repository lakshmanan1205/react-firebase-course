// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6n7jFsobj865hcwAcXy0xlrRmg_116Ms",
  authDomain: "fir-course-c7eda.firebaseapp.com",
  projectId: "fir-course-c7eda",
  storageBucket: "fir-course-c7eda.appspot.com",
  messagingSenderId: "319368312139",
  appId: "1:319368312139:web:da16a4c1a55e8a61e564ce",
  measurementId: "G-CZ9RM5Y297",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
