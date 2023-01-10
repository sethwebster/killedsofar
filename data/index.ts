interface AnimalData {
  chickens: number;
  turkeys: number;
  cattle: number;
  pigs: number;
  ducks: number;
  sheep: number;
  aquatic: number;
  total: number;
}

let data: AnimalData = {
  chickens: 9346660000,
  turkeys: 223003000,
  cattle: 33242000,
  pigs: 131563000,
  ducks: 22484000,
  sheep: 2225000,
  aquatic: 55429141000,
  total: 65188318000,
}

// // const total = Object.keys(data).reduce((acc, key) => acc + (data as any as Record<string, number>)[key], 0)
// console.log("TOTAL",)
// data = {
//   ...data,
//   total
// }

export default data;