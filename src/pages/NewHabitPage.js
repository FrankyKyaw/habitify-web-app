import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext";

export default function NewHabitPage() {
  const [title, setTitle] = useState("");

  const { currentUser } = useAuth();
  let navigate = useNavigate();
  const createPost = async () => {
    if (currentUser) {
      const habitsCollectionRef = collection(
        db,
        `users/${auth.currentUser.uid}/habits`
      );
      await addDoc(habitsCollectionRef, {
        title,
        author: {
          displayName: auth.currentUser.displayName,
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
        },
        streak: {
          current: 0,
        },
        days: 123,
        completed: false
      });
      navigate("/allhabits");
    }
   
  };
  
  const test = () => {
    console.log('asdfa');
    navigate('/');
  }
    
  return (
      <div className="w-1/2">
        <div className="flex justify-between w-full h-16">
          <input
            className="w-11/12  border p-2"
            placeholder="Add a habit"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            className="flex items-center justify-center border w-12 "
            onClick={createPost}
          >
            <AiOutlinePlus size={24} />
          </button>
        </div>
      </div>
  );
}
