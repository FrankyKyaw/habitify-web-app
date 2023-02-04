import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function NewHabitPage() {
  const [title, setTitle] = useState("");
  // const [postText, setPostText] = useState("");

  const habitsCollectionRef = collection(db, `users/${auth.currentUser.uid}/habits`);

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(habitsCollectionRef, {
      title,
      author: {
        displayName: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        email: auth.currentUser.email
      },
      streak: {
        current: 0
      },
      days: [
        {date: 123, completed: true}
      ]
    });
    navigate("/allhabits");
  };
  return (
    <div className="flex flex-col h-screen my-auto items-center p-10">
      <div className="flex flex-col space-y-5 h-auto w-500 items-center p-20 bg-teal-500 rounded">
        <div className="">
          <label>Title:</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <button
          className="w-1/2 text-center py-3 rounded bg-green-300"
          onClick={createPost}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
}
