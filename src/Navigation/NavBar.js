import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { currentUser } = useAuth();

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/login");
    });
  };

  async function logoutHandler() {
    setError("");

    try {
      await signUserOut();
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <header className="px-28 bg-orange-50">
      <nav className="p-7  flex items-center justify-between">
        <div>
          <Link to="/" className="text-3xl">
            Habitify
          </Link>
        </div>
        <ul className="flex items-center">
          <li className="mx-4">
            {currentUser && (
              <Link
                to="/allhabits"
                className="text-xl hover:text-cyan-500 duration"
              >
                My Habits
              </Link>
            )}
          </li>
          <li className="mx-4">
            {!currentUser && (
              <Link
                to="/signup"
                className="text-xl hover:text-cyan-500 duration"
              >
                Sign up
              </Link>
            )}
          </li>
          <li className="mx-4">
            {!currentUser && (
              <Link
                to="/login"
                className="text-xl hover:text-cyan-500 duration"
              >
                Login
              </Link>
            )}
            <li />
            <li className="mx-4">
              {currentUser && (
                <button
                  className="text-xl hover:text-cyan-500 duration"
                  onClick={logoutHandler}
                >
                  Log Out
                </button>
              )}
            </li>
          </li>
        </ul>
      </nav>
    </header>
  );
}
