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

export function getUpToDateDataSince(startTime: Date): AnimalData {
  const keys = Object.keys(data) as (keyof AnimalData)[];
  const result = Object.assign({}, data);
  keys.forEach(key => {
    result[key] = getAnimalsOfTypeKilledSince(startTime, key);
  });
  return result;
}

export function getAnimalsOfTypeKilledSince(
  startTime: Date,
  animal: keyof AnimalData
) {
  return getAnimalsKilledSince(startTime, data[animal]);
}

export function getAnimalsKilledSince(startTime: Date, animalsPerYear: number) {
  const animalsPerMs = animalsPerYear / msPerYear;
  const animalsKilled =
    (new Date().getTime() - startTime.getTime()) * animalsPerMs;
  return animalsKilled;
}

export default function getAnimalsKilledToDate() {
  const animalsKilled = getAnimalsKilledSince(
    dateAtStartOfThisYear,
    totalAnimalsKilledPerYearWithMarineLife
  );
  return animalsKilled;
}
