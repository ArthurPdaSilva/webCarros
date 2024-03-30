import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJVJJUjWN-d9KdpxMV3WERbAkPbdnQtWE",
  authDomain: "web-carros-5613f.firebaseapp.com",
  projectId: "web-carros-5613f",
  storageBucket: "web-carros-5613f.appspot.com",
  messagingSenderId: "971794513235",
  appId: "1:971794513235:web:ef2a3d488352f079d2b5a6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
