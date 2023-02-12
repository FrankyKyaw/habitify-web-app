import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HabitItem from "../components/HabitItem";
import HabitList from "../components/HabitList";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase-config";
import useCollection from "../hooks/useCollection";
import NewHabitPage from "./NewHabitPage";

export default function AllHabitsPage() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);

  const [style, setStyle] = useState({ width: "50%" });
  
  useEffect(() => {
    if (currentUser) {
      const ref = collection(db, `users/${currentUser.uid}/habits`);
      getDocs(ref).then((snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setHabits(results);
      });
    }
  }, [currentUser]);
  return (
    
    <div className="flex flex-col space-y-6 h-screen my-auto items-center p-10">
      <NewHabitPage/>
      <div class="w-1/2 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={style}
        >
          {" "}
          50%
        </div>
        </div>
      <section className="w-1/2 ">
        <p>You have 4 habits left to practice.</p>
        <HabitList habits={habits} />
      </section>
      
    </div>
  );
}
