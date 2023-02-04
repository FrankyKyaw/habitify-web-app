import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";

export default function useCollection(c) {
  const [documents, setDocuments] = useState(null);
    const {currentUser} = useAuth()
  useEffect(() => {
    let ref = collection(db, c);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().author_id === currentUser.uid) {
          results.push({ id: doc.id, ...doc.data() });
        }
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [c]);
  return { documents };
}
