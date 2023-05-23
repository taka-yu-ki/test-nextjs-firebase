// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsd0cZTbNGEZrz61VnAfAmLsPRVpg8_hA",
  authDomain: "test1-20a2a.firebaseapp.com",
  projectId: "test1-20a2a",
  storageBucket: "test1-20a2a.appspot.com",
  messagingSenderId: "891387761595",
  appId: "1:891387761595:web:7fbe060de58b02526faa9e",
  measurementId: "G-E3N0KFZK3N",
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const funcitons = getFunctions();
export const storage = getStorage();
export const auth = getAuth();
