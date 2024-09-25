import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA48-NO5iMBzfdPTjxXgRIqFAYf2N9k-9U",
  authDomain: "e-voting-c0337.firebaseapp.com",
  databaseURL: "https://e-voting-c0337-default-rtdb.firebaseio.com",
  projectId: "e-voting-c0337",
  storageBucket: "e-voting-c0337.appspot.com",
  messagingSenderId: "82901621287",
  appId: "1:82901621287:web:2c6bd7d73fa34565264c02",
  measurementId: "G-ESWS5B55EB"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);


export { auth, analytics, firebaseApp, db, storage, signInWithPhoneNumber, RecaptchaVerifier };
