
import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import HabitItem from '../components/HabitItem';
import HabitList from '../components/HabitList';
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase-config'

export default function AllHabitsPage() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);

  const getHabits = () => {
    
    onSnapshot(collection(db, "habits"), (snapshot) => { 
      let data = []
      snapshot.docs.forEach((doc) => {
        data.push(doc.data())
        
      })
      data.forEach(items => {
        
        if (items.author_id === currentUser.uid) {
          setHabits([{
            title: items.title,
            description: items.postText
          }]) 
          
        } else {
          console.log(currentUser.uid)
        }

      });
    })
  }



  let content = <HabitList habits={habits}/>
  return (
    <Fragment>
      <button onClick={getHabits}>Click here to test</button>
      <section>
        {content}
      </section>
    </Fragment>
  )
}
