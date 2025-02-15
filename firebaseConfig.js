import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQba2_FqPZuAww7XuDMoiqlf2_l85zKWw",
  authDomain: "imasha-app.firebaseapp.com",
  projectId: "imasha-app",
  storageBucket: "imasha-app.firebasestorage.app",
  messagingSenderId: "760730635255",
  appId: "1:760730635255:web:0ba748f1545da023197cf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Initialize Firestore

export { app, db };