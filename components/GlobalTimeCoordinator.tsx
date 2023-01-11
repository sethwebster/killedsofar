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

interface QueueItem {
  triggerTime: number;
  callback: () => void;
}

class GlobalTimedQueue {
  interval: NodeJS.Timeout | null = null;
  queue: QueueItem[] = [];
  constructor() {
    this.interval = setTimeout(() => this._tick(), 1000);
  }

  _tick() {
    const toTrigger = this.queue.filter((q) => q.triggerTime <= Date.now());
    this.queue = this.queue.reduce(
      (all, curr) => (toTrigger.includes(curr) ? all : [...all, curr]),
      [] as QueueItem[]
    );
    while (toTrigger.length > 0) {
      const item = toTrigger.shift();
      item?.callback();
    }
    setTimeout(() => this._tick(), 1000);
  }

  add({ triggerTime, callback }: QueueItem) {
    this.queue.push({ triggerTime, callback });
  }

  remove(callback: () => void) {
    this.queue = this.queue.filter((q) => q.callback !== callback);
  }
}

const globalTimedQueue = new GlobalTimedQueue();

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

  const callback = useCallback(() => {
    if (!skipFirst || invocationCount.current > 0) {
      onSignalRaised();
    }
    invocationCount.current++;
    const triggerTime =
      Date.now() + getMsToNextOccurence(signalOn, "every", signalValue);
    globalTimedQueue.add({ triggerTime, callback });
  }, [onSignalRaised, signalOn, signalValue, skipFirst]);

  useEffect(() => {
    let triggerTime =
      Date.now() + getMsToNextOccurence(signalOn, "every", signalValue);

    globalTimedQueue.add({ triggerTime, callback });
    return () => globalTimedQueue.remove(callback);
  }, [callback, onSignalRaised, signalOn, signalValue, skipFirst]);
  return <></>;
}
