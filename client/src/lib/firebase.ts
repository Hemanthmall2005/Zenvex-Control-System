import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmC4AacbHLLJNakX5W5FwSlQ8UEylOne0",
  authDomain: "zenvex-pesticontorl.firebaseapp.com",
  projectId: "zenvex-pesticontorl",
  storageBucket: "zenvex-pesticontorl.firebasestorage.app",
  messagingSenderId: "992533694088",
  appId: "1:992533694088:web:5010e098b25324a2b7813d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();