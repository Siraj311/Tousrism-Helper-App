import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBQba2_FqPZuAww7XuDMoiqlf2_l85zKWw",
//   authDomain: "imasha-app.firebaseapp.com",
//   projectId: "imasha-app",
//   storageBucket: "imasha-app.firebasestorage.app",
//   messagingSenderId: "760730635255",
//   appId: "1:760730635255:web:0ba748f1545da023197cf2",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCA3P0qgSJGLGoq0oDzAmAsF1fHA_xifxM",
  authDomain: "my-project-d37c7.firebaseapp.com",
  projectId: "my-project-d37c7",
  storageBucket: "my-project-d37c7.firebasestorage.app",
  messagingSenderId: "143823649251",
  appId: "1:143823649251:web:8e3599de600035bf0808d6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Initialize Firestore

export { app, db };