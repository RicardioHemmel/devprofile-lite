import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGY7ZudCfBspHgMFa9jTFa_sovT7OQBas",
    authDomain: "devprofile-lite-35285.firebaseapp.com",
    projectId: "devprofile-lite-35285",
    storageBucket: "devprofile-lite-35285.firebasestorage.app",
    messagingSenderId: "1072036922787",
    appId: "1:1072036922787:web:2fa6683a3fd3a369e70616",
    measurementId: "G-H1W05D44S2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
