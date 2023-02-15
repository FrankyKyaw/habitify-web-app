import {
  collection,
  deleteDoc,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";

export default function HabitItem(props) {
  const { currentUser } = useAuth();

  let navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck1 = () => {
    if (currentUser) {
      try {
        const updatedHabit = runTransaction(db, (transaction) => {
          const habitRef = doc(
            db,
            "users",
            `${currentUser.uid}`,
            "habits",
            `${props.id}`
          );
          const doc = transaction.get(habitRef);
          const newStreak = doc.data().streak.current + 1;
          transaction.update(habitRef, { completed: true, streak: { current: newStreak } });
          return newStreak;
        });

      } catch (e) {
        console.error(e);
      }
    }
  };
  // const handleCheck = async () => {
  //   if (currentUser) {
  //     const habitRef = doc(
  //       db,
  //       "users",
  //       `${currentUser.uid}`,
  //       "habits",
  //       `${props.id}`
  //     );
  //     await updateDoc(habitRef, {
  //       "completed": true
  //     })
  //   }
  //   setIsChecked(true);
  // };

  const onDelete = async () => {
    if (currentUser) {
      const habitRef = doc(
        db,
        "users",
        `${currentUser.uid}`,
        "habits",
        `${props.id}`
      );
      await deleteDoc(habitRef);
      navigate("/allhabits");
    }
  };
  return (
    <div className="">
      <li className="flex p-6 text-center rounded-xl transition ease-in-out delay-100 bg-blue-200 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 duration-200 ...">
        <label className="flex radio p-2 cursor-pointer font-extralight text-xs">
          <input
            className="my-auto transform scale-125"
            type="checkbox"
            name="sfg"
            onClick={handleCheck1}
          />
        </label>
        <Link to={`/allhabits/${props.id}`}>
          <p className="pl-4 text-2xl">{props.title}</p>
        </Link>
        <button className="pr-3 ml-auto" onClick={onDelete}>
          {<FaRegTrashAlt />}
        </button>
      </li>
    </div>
  );
}
