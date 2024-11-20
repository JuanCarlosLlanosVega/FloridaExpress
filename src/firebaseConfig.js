// firebaseConfig.js
/*
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
*/
// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNqcKf1lhvJc8u59g3UIb_THJWl66QZdY",
  authDomain: "floridaexpress-e4ae9.firebaseapp.com",
  projectId: "floridaexpress-e4ae9",
  storageBucket: "floridaexpress-e4ae9.firebasestorage.app",
  messagingSenderId: "578478024656",
  appId: "1:578478024656:web:c65bfe1f771df13f3e3bd5",
  measurementId: "G-RYDC8W256R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

/*
// Importar las funciones necesarias del SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importar Firestore

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNqcKf1lhvJc8u59g3UIb_THJWl66QZdY",
  authDomain: "floridaexpress-e4ae9.firebaseapp.com",
  projectId: "floridaexpress-e4ae9",
  storageBucket: "floridaexpress-e4ae9.appspot.com",
  messagingSenderId: "578478024656",
  appId: "1:578478024656:web:c65bfe1f771df13f3e3bd5",
  measurementId: "G-RYDC8W256R"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Exportar la instancia de Firestore
export default db;
*/
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNqcKf1lhvJc8u59g3UIb_THJWl66QZdY",
  authDomain: "floridaexpress-e4ae9.firebaseapp.com",
  projectId: "floridaexpress-e4ae9",
  storageBucket: "floridaexpress-e4ae9.appspot.com",
  messagingSenderId: "578478024656",
  appId: "1:578478024656:web:c65bfe1f771df13f3e3bd5",
  measurementId: "G-RYDC8W256R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
