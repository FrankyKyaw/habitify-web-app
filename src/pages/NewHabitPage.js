import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function NewHabitPage() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const habitsCollectionRef = collection(db, "habits");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(habitsCollectionRef, {
      title,
      postText,
      author_name: auth.currentUser.displayName,
      author_id: auth.currentUser.uid,
    });
    navigate("/");
  };
  return (
    <div className="flex flex-col h-screen my-auto items-center p-10">
      <div className="flex flex-col h-auto w-1/3 items-center p-20 bg-teal-500 rounded">
        <div className="border">
          <label>Title:</label>
          <input
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="border">
          <label>Post:</label>
          <textarea
            placeholder="Lorem Ipsum...."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <button
          className="w-full text-center py-3 rounded bg-green-300"
          onClick={createPost}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
}
