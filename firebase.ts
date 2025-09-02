import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHP0vQ-wOGTOwE6DsOlBY7XB0W9YzF-oc",
  authDomain: "chikiwiki-ce722.firebaseapp.com",
  projectId: "chikiwiki-ce722",
  storageBucket: "chikiwiki-ce722.appspot.com",
  messagingSenderId: "384868757762",
  appId: "1:384868757762:web:45c5100bef64fa64e5d21b",
  measurementId: "G-JRQ7WQZPXN",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
