import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5hESU8-49izac7B-YRL8ZqyiqSr6hJGs",
  authDomain: "smartinvestai-5475f.firebaseapp.com",
  projectId: "smartinvestai-5475f",
  storageBucket: "smartinvestai-5475f.firebasestorage.app",
  messagingSenderId: "1080477532245",
  appId: "1:1080477532245:web:5cb2f98ee9f468589914dc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);