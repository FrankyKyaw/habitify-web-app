import React, { useState, useRef } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/allhabits");
    } catch(error){
      setError(error);
    }
    setLoading(false);
  }

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

  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto pt-32 flex  flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Login</h1>
          {error && alert(error)}
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />

            {!loading && (
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-dark focus:outline-none my-1"
              >
                Login
              </button>
            )}
            
          </form>
          <p className="w-full text-center py-3">Or</p>
          <button
            className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-dark focus:outline-none my-1"
            onClick={signInHandler}
          >
            Sign in with Google
          </button>
          <div className="pt-3 w-full text-center underline">
              <Link to="/signup">Create an account</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
