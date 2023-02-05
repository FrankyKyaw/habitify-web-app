import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import HabitDetail from "../components/HabitDetail";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase-config";

export default function HabitPage() {
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
        let res = [];
        res.push({ id: specificDoc.author.id, title: specificDoc.title });
        setResults(res);
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
      {results.length > 0 && (
        <section>
          <div>{results[0].title}</div>
          <div>{results[0].id}</div>
        </section>
      )}
    </div>
  );
}
