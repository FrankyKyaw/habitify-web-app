import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HabitItem from "../components/HabitItem";
import HabitList from "../components/HabitList";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase-config";
import useCollection from "../hooks/useCollection";


export default function AllHabitsPage() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);

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
    <div className="flex flex-col h-screen my-auto items-center p-10">
      <section className="w-1/2 ">
        <HabitList habits={habits} /> 
      </section>
    </div>
  );
}
