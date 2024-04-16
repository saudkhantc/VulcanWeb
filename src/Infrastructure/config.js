import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";

let firebaseConfig;

if (process.env.NODE_ENV === "production") {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PROD_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_PROD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_PROD_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_PROD_MEASUREMENT_ID,
  };
} else {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_DEV_MEASUREMENT_ID,
  };
}

export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
