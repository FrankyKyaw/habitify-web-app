import React, { useState } from "react";

export default function ProgressBar({ done }) {
  const [style, setStyle] = useState({ width: "40%" });

  return (
    <div>
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={style}
        >
          {" "}
          45%
        </div>
      </div>
    </div>
  );
}
