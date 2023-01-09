"use client";
import { useCallback, useEffect, useState } from "react";
import getAnimalsKilledToDate from "../helpers/getAnimalsKilledToDate";
import { setBrowserTitle } from "../helpers/setBrowserTitle";

const counterSpeed = 75;
export default function Counter() {
  const [killedSoFar, setKilledSoFar] = useState(getAnimalsKilledToDate());
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const killedSoFar = getAnimalsKilledToDate();
      setKilledSoFar(Math.round(killedSoFar));

      setBrowserTitle(
        killedSoFar.toLocaleString("en-US") + " animals killed so far this year"
      );
    }, counterSpeed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFirst(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`bg-slate-800 bg-opacity-40 md:w-4/5 m-auto rounded p-10 transition-all duration-1000 ${
        first ? "bg-opacity-0 mt-0 opacity-0" : ""
      }`}
    >
      <div className="flex justify-center flex-col w-full h-full ">
        <div className="text-center text-white">
          <h1 className="md:text-6xl text-4xl text-white drop-shadow-md font-mono">
            {killedSoFar.toLocaleString("en-US")}
          </h1>
          <div className="text-lg md:text-xl">
            animals killed so far for food this year (world-wide)
          </div>
        </div>
      </div>
    </div>
  );
}
