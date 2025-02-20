// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJixClqElAOr1lDnySzExt1rFndh-B-OM",
    authDomain: "fe24-mp3-hampus-svensson.firebaseapp.com",
    projectId: "fe24-mp3-hampus-svensson",
    storageBucket: "fe24-mp3-hampus-svensson.firebasestorage.app",
    messagingSenderId: "992871561050",
    appId: "1:992871561050:web:31a8bf5282cad35f856563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);