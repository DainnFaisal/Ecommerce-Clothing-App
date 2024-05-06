import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCx1z3-mszVjr7tBSN7woSuBg089eB1Umg",
    authDomain: "fir-authorization-chat.firebaseapp.com",
    projectId: "fir-authorization-chat",
    storageBucket: "fir-authorization-chat.appspot.com",
    messagingSenderId: "72612033232",
    appId: "1:72612033232:web:cd729fb34db7e9a96ce4d5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 

export { auth, db }; 
