import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgoA5I-eIhp5mMWILTzCgfbU4-6rju01c",
  authDomain: "shoutouts-8dc16.firebaseapp.com",
  projectId: "shoutouts-8dc16",
  storageBucket: "shoutouts-8dc16.appspot.com",
  messagingSenderId: "361253651305",
  appId: "1:361253651305:web:82e207f20b1e48c406f3f8",
  measurementId: "G-4C8RJLCTJ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): void => {
  signInWithPopup(auth, authProvider);
};

export const signOut = (): void => {
  auth.signOut();
};

export const storage = getStorage(app);
