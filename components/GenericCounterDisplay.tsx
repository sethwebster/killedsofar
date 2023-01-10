"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import getAnimalsKilledToDate, {
  getAnimalsKilledSince,
} from "../helpers/getAnimalsKilledToDate";
import { setBrowserTitle } from "../helpers/setBrowserTitle";

const counterSpeed = 5000;

export default function GenericCounterDisplay({
  value,
  text,
}: {
  value: number;
  text: string;
}) {
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirst(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`bg-slate-800 bg-opacity-40 mt-3  m-auto rounded p-5 transition-all duration-1000 shadow-md ${
        first ? "bg-opacity-0 mt-0 opacity-0" : ""
      }`}
    >
      <div className="flex justify-center flex-col w-full h-full ">
        <div className="text-center text-white">
          <h1 className="md:text-6xl text-4xl text-white drop-shadow-md font-mono">
            {value.toLocaleString("en-US")}
          </h1>
          <div className="text-lg md:text-xl">{text}</div>
        </div>
      </div>
    </div>
  );
}
