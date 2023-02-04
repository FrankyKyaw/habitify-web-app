import React from "react";
import { Link } from "react-router-dom";

export default function HabitItem(props) {
  return (
    <li className="p-6 text-center rounded-2xl transition ease-in-out delay-100 bg-blue-200 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 duration-200 ...">
      <Link to={`/allhabits/${props.id}`}>
        <p className="text-2xl">{props.title}</p>
      </Link>
    </li>
  );
}
