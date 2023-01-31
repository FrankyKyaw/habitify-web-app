import React from "react";
import HabitItem from "./HabitItem";

export default function HabitList(props) {
  return (
    <ul>
      {props.habits.map((habit) => (
        <HabitItem title={habit.title} description={habit.description} />
      ))}
    </ul>
  );
}
