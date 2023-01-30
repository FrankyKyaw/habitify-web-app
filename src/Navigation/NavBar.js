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
      navigate('/login');
    });
  };

  async function logoutHandler () {
    setError('');

    try {
        await signUserOut();
    } catch {
        setError('Failed to logout');
    }
  };
  return (
    <header>
      <nav className="p-5 bg-white shadow flex items-center justify-between">
        <Link to="/">Home</Link>
        {!currentUser ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logoutHandler}>Log Out</button>
        )}
        <Link to="/newhabit">Add Habit</Link>
      </nav>
    </header>
  );
}
