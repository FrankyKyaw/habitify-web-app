import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {FaRegTrashAlt} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";


export default function HabitItem(props) {

  const { currentUser } = useAuth();

  let navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const ref = collection(db, `users/${currentUser.uid}/habits`);
  
  
  const handleCheck = () => {
    setIsChecked(true);
  };

  const onDelete = () => {
    if (currentUser) {
      const habitRef = doc(db, "users", `${currentUser.uid}`, "habits", `${props.id}`);
      deleteDoc(habitRef)
      navigate("/allhabits")
    }
    
  }
  return (
    <div className="">
      {!isChecked ? (
        <li className="flex p-6 text-center rounded-xl transition ease-in-out delay-100 bg-blue-200 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 duration-200 ...">
          <label className="flex radio p-2 cursor-pointer font-extralight text-xs">
            <input
              className="my-auto transform scale-125"
              type="checkbox"
              name="sfg"
              checked={isChecked}
              onClick={handleCheck}
            />
          </label>
          <Link to={`/allhabits/${props.id}`}>
            <p className="pl-4 text-2xl">{props.title}</p>
          </Link>
          <button className="pr-3 ml-auto" onClick={onDelete}>{<FaRegTrashAlt/>}</button>

        </li>
      ) : null}
    </div>
  );
}
