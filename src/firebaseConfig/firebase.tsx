import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7ZT4O7fSUd-tsRNzFhwHesTRqlTtLcvE",
  authDomain: "examen-api-2ede4.firebaseapp.com",
  databaseURL: "https://examen-api-2ede4-default-rtdb.firebaseio.com",
  projectId: "examen-api-2ede4",
  storageBucket: "examen-api-2ede4.appspot.com",
  messagingSenderId: "482087744118",
  appId: "1:482087744118:web:e9ccf8dd545d25f384a557"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const imageDb = getStorage(app);