// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa4UdpZsXrwoOWaEAJ3xre5Bpk4pF7C5U",
  authDomain: "echo-chamber-b86da.firebaseapp.com",
  projectId: "echo-chamber-b86da",
  storageBucket: "echo-chamber-b86da.firebasestorage.app",
  messagingSenderId: "782059303593",
  appId: "1:782059303593:web:922095416ede7168942fb8",
  measurementId: "G-W4Q42TS6MG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
