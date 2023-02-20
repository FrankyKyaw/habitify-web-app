import React from "react";

export default function HomePage() {
  return (
    <div className='h-screen px-32 pt-52 pb-80'>
    <div className="flex flex-col items-center space-y-12">
      <div className="flex flex-col max-w-[650px]">
        <h1 className="text-5xl font-bold ">
          Make your habits more consistent.
        </h1>
        <p className="pt-6 italic text-2xl font-medium">
          "The key to expertise in any skill is in simply practicing at least
          10,000 hours. and have fun while doing them."   
        </p>
        <span className="pt-4 italic mt-6 text-xl font-medium">Malcolm Gladwell</span>
      </div>
    </div>
    </div>
  );
}
