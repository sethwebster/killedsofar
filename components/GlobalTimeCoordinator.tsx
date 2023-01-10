import { useCallback, useEffect, useRef } from "react";
type TimeType = "seconds" | "minutes" | "hours";
type TriggerType = "specific" | "every";
const msPerDay = 86400000;
const msPerMinute = 60000;
const msPerHour = 3600000;
const msPerSecond = 1000;
const hoursPerDay = 24;
const minutesPerHour = 60;
const secondsPerMinute = 60;

function getMsToNextOccurence(
  type: TimeType,
  triggerType: TriggerType,
  timeValue: number
) {
  const now = new Date();
  let value: number = 0;
  let delta: number = 0;
  switch (triggerType) {
    case "specific":
      switch (type) {
        case "minutes":
          value =
            ((minutesPerHour - now.getMinutes() + timeValue) % minutesPerHour) *
            msPerMinute;
          if (value === 0) {
            // This is the same minute we're in, and as such, should be the *next* occurrence
            return msPerMinute - now.getSeconds() * msPerSecond;
          }
          return value;
        case "hours":
          value = ((24 - now.getHours() + timeValue) % 24) * msPerDay;
          if (value === 0) {
            // This is the same hour we're in, and as such, should be the *next* occurrence
            return msPerDay - now.getMinutes() * msPerMinute;
          }
          return value;
        case "seconds":
          value =
            ((secondsPerMinute - now.getSeconds() + timeValue) %
              secondsPerMinute) *
            1000;
          if (value === 0) {
            return msPerSecond - now.getMilliseconds();
          }
          return value;
      }
    case "every":
      switch (type) {
        case "minutes":
          delta = timeValue - (now.getMinutes() % timeValue);
          if (delta === 0) {
            value = timeValue * msPerMinute;
          } else {
            value = delta * msPerMinute;
          }
          return value;
        case "hours":
          delta = timeValue - (now.getHours() % timeValue);
          if (delta === 0) {
            value = timeValue * msPerHour;
          } else {
            value = delta * msPerHour;
          }
          return value;
        case "seconds":
          delta = timeValue - (now.getSeconds() % timeValue);
          if (delta === 0) {
            value = timeValue * msPerSecond;
          } else {
            value = delta * msPerSecond;
          }
          return value;
      }
  }
}

export default function GlobalTimeCoordinator({
  signalOn,
  signalValue,
  onSignalRaised,
  skipFirst,
}: {
  signalOn: TimeType;
  signalValue: number;
  onSignalRaised: () => void;
  skipFirst?: boolean;
}) {
  const interval = useRef<NodeJS.Timer | null>();
  const invocationCount = useRef(0);

  const tick = useCallback(() => {
    if (!skipFirst || invocationCount.current > 0) {
      onSignalRaised();
    } 
    invocationCount.current++;
    setTimeout(tick, getMsToNextOccurence(signalOn, "every", signalValue));
  }, [onSignalRaised, signalOn, signalValue, skipFirst]);

  useEffect(() => {
    let timeToNextOccurrence = getMsToNextOccurence(
      signalOn,
      "every",
      signalValue
    );

    interval.current = setTimeout(tick, timeToNextOccurrence);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [onSignalRaised, signalOn, signalValue, skipFirst, tick]);
  return <></>;
}
