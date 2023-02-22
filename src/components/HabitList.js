import React from "react";
import HabitItem from "./HabitItem";

export default function HabitList(props) {
  return (
    <ul className="space-y-6 ">
      {props.habits.map((habit) => (
        <HabitItem title={habit.title} key={habit.id} id={habit.id}/>
      ))}
    </ul>
  );
}
