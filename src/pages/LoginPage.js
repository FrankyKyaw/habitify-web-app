import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      navigate("/");
    });
  };
  
  async function signInHandler(event) {
    event.preventDefault();
    try {
      await signInWithGoogle();
    } catch {
      setError("Failed to sign in");
    }
  }
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     localStorage.setItem("isAuth", true);
  //     setIsAuth(true);
  //     navigate("/")
  //   });

  return (
    <div>
      <p>Sign in with Google to Continue</p>
      <button
        className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-dark focus:outline-none my-1"
        onClick={signInHandler}
      >
        Sign in with Google
      </button>
    </div>
  );
}
