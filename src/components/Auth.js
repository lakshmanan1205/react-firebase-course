import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";

export default function Auth() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function signUp() {
    try {
      console.log("user", email, password);
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }
  async function signIn() {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.error(error);
    }
  }
  async function googleSignIn() {
    try {
      signInWithPopup(auth, GoogleAuthProvider);
    } catch (error) {
      console.error(error);
    }
  }
  async function logOut() {
    signOut(auth);
  }

  console.log("mail-user", auth.currentUser?.email);

  return (
    <div>
      <h1>{auth.currentUser?.email}</h1>
      <input
        placeholder="Email ..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password ..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>sign up </button>
      <button onClick={signIn}>sign in</button>
      <button onClick={googleSignIn}>google sign in</button>
      <button onClick={logOut}>sign out</button>
    </div>
  );
}
