import React from "react";

export default function HabitItem(props) {
  return (
    <li>
      <p>{props.title}</p>
      <p>{props.text}</p>
    </li>
  );
}
