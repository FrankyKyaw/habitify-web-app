import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HabitItem(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
  };

  return (
    <div>
      {!isChecked ? (
        <li className="flex space-x-6 p-6 text-center rounded-2xl transition ease-in-out delay-100 bg-blue-200 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 duration-200 ...">
          <label class="flex radio p-2 cursor-pointer font-extralight text-xs">
            <input
              class="my-auto transform scale-125"
              type="checkbox"
              name="sfg"
              checked={isChecked}
              onClick={handleCheck}
            />
          </label>
          <Link to={`/allhabits/${props.id}`}>
            <p className="text-2xl">{props.title}</p>
          </Link>
        </li>
      ) : null}
    </div>
  );
}
