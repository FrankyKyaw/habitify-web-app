import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewHabitPage from "./pages/NewHabitPage";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Layout from "./Navigation/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import AllHabitsPage from "./pages/AllHabitsPage";
import SignUpPage from "./pages/SignUpPage";
import HabitPage from "./pages/HabitPage";

function App() {
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     navigate("/login");
  //   });
  // };

  return (
    <div>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/newhabit" element={<NewHabitPage />} />

            <Route exact path="/allhabits" element={<AllHabitsPage />} >
              
            </Route>
            <Route path="/allhabits/:id" element={<HabitPage />}/>

            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
