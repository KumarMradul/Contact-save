// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC11WUF3NESK1T4638cF-mKo2-837eCqQE",
  authDomain: "vite-contact-f5d29.firebaseapp.com",
  projectId: "vite-contact-f5d29",
  storageBucket: "vite-contact-f5d29.appspot.com",
  messagingSenderId: "57248548924",
  appId: "1:57248548924:web:2d340aea088775e69ddb39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);