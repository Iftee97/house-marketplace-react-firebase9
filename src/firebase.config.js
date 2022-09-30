import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAw_-hEqr2vacG3IsiX0KHm_xYDRE9GDXI",
  authDomain: "house-marketplace-18fd6.firebaseapp.com",
  projectId: "house-marketplace-18fd6",
  storageBucket: "house-marketplace-18fd6.appspot.com",
  messagingSenderId: "40725825260",
  appId: "1:40725825260:web:be381b1bfe35224f5247c9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Intialize firebase services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {
  db,
  auth,
  storage
}