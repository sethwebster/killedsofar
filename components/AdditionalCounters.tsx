"use client";
import { startTransition, useCallback, useEffect, useState } from "react";
import { EMPTY_DATA } from "../data";
import { getUpToDateDataSince } from "../helpers/getAnimalsKilledToDate";
import GenericCounterDisplay from "./GenericCounterDisplay";
import GlobalTimeCoordinator from "./GlobalTimeCoordinator";

interface AdditionalCountersProps {
  updateFrequency?: number;
  startTime?: Date;
}

export default function AdditionalCounters({
  updateFrequency = 5000,
  startTime,
}: AdditionalCountersProps) {
  const [data, setData] = useState<AnimalData>(EMPTY_DATA);
  const [startDateLocal, setStartDateLocal] = useState(startTime ?? new Date());

  const tick = useCallback(() => {
    startTransition(() => setData(getUpToDateDataSince(startDateLocal)));
  }, [startDateLocal]);

  return (
    <>
      <GlobalTimeCoordinator
        onSignalRaised={tick}
        signalOn="seconds"
        signalValue={5}
        skipFirst
      />

      <GenericCounterDisplay
        value={Math.round(data.chickens)}
        text="Chickens"
      />
      <GenericCounterDisplay value={Math.round(data.turkeys)} text="Turkeys" />
      <GenericCounterDisplay value={Math.round(data.cattle)} text="Cattle" />
      <GenericCounterDisplay value={Math.round(data.ducks)} text="Ducks" />
      <GenericCounterDisplay value={Math.round(data.sheep)} text="Sheep" />
      <GenericCounterDisplay value={Math.round(data.pigs)} text="Pigs" />
      <GenericCounterDisplay value={Math.round(data.aquatic)} text="Sea Life" />
      <GenericCounterDisplay value={Math.round(data.total)} text="Total" />
    </>
  );
}
