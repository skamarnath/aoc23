import { fetchInput } from "./utils/input.ts";
import { part1, part2 } from "./solutions/day1.ts"
import { part1 as day2part1, part2 as day2part2 } from "./solutions/day2.ts"
import log from "./utils/log.ts";

interface SolutionMap {
  [key: string]: [(input: string) => string, (input: string) => string]
}

const solutionMap: SolutionMap = {
  "1": [part1, part2],
  "2": [day2part1, day2part2],
}

if (import.meta.main) {
  const [day] = Deno.args;
  if (!day) {
    log.warn("main", "Please pass the day");
  }
  if (solutionMap[day]) {
    console.log(solutionMap[day][0](await fetchInput(day)));
    console.log(solutionMap[day][1](await fetchInput(day)));
  } else {
    log.warn("main", "Solution not implemented")
  }
}
