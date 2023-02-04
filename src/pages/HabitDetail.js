import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase-config";

export default function HabitDetail() {
  const routeParams = useParams();
  const { id } = routeParams;
  const { currentUser } = useAuth();
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (currentUser) {
      const ref = collection(db, `users/${auth.currentUser.uid}/habits`);
      getDocs(ref).then((snapshot) => {
        const specificDoc = snapshot.docs
          .filter((doc) => doc.id === id)[0]
          .data();
        console.log(specificDoc);
        let res = [];
        res.push({ id: specificDoc.author_id, title: specificDoc.title });
        setResults([...results, res]);
        console.log(results)
        //   snapshot.docs.forEach(doc => {
        //     console.log(doc.data())
        //     if (doc.data().id === id) {
        //         setResults({id: doc.id, ...doc.data()})
        //     }

        //   })
      });
    }

    //   snapshot.docs.forEach(doc => {
    //     if (doc.data().author_id === currentUser.uid) {
    //       results.push({id: doc.id, ...doc.data()})
    //     }

    //   })
  }, [currentUser]);

  return (
    <div className="flex flex-col h-screen my-auto items-center p-10">
      <h1>Hello</h1>
      {results.map(result => <div>Author: {result.author_id}</div>)}
    </div>
  );
}
