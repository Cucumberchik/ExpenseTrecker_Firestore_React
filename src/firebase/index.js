import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUtI0ueKRYp_tZjGIAP62oBxFyeHJS8OE",
  authDomain: "dordoi-plaza.firebaseapp.com",
  projectId: "dordoi-plaza",
  storageBucket: "dordoi-plaza.appspot.com",
  messagingSenderId: "779167121768",
  appId: "1:779167121768:web:2456dd668a3d7b0a2096dd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
