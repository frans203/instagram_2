// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANnMSZ9TcxqYvEbpHi6JpV3x7RrTZEGPY",
    authDomain: "instagram-2-ca6db.firebaseapp.com",
    projectId: "instagram-2-ca6db",
    storageBucket: "instagram-2-ca6db.appspot.com",
    messagingSenderId: "319188561144",
    appId: "1:319188561144:web:09369f6a568792739c1f0d",
    measurementId: "G-QZ1BYPTH19"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {
    app, db, storage
}