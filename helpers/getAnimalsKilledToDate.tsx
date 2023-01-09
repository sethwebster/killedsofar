import data from "../data";

// OLD DATA
// const totalAnimalsKilledPerYearWithMarineLife = 1059000000000;
// NEW DATA
const totalAnimalsKilledPerYearWithMarineLife = data.total;
const msPerYear = 31536000000;
const animalsPerMs = Math.floor(
  totalAnimalsKilledPerYearWithMarineLife / msPerYear
);
const dateAtStartOfThisYear = new Date(new Date().getFullYear(), 0, 1);

export function getAnimalsKilledSince(startTime: Date, animalsPerYear: number) {
  const animalsPerMs = animalsPerYear / msPerYear;
  const animalsKilled = (new Date().getTime() - startTime.getTime()) * animalsPerMs;
  return animalsKilled;
}

export default function getAnimalsKilledToDate() {
  const animalsKilled = getAnimalsKilledSince(dateAtStartOfThisYear, totalAnimalsKilledPerYearWithMarineLife);
  return animalsKilled;
}
