import log from "../utils/log.ts";
import { inputToLines } from "../utils/string.ts";

const bag = {
  red: 12, green: 13, blue: 14
}

function validGame(game: string) {
  for (const items of game.split(", ")) {
    const [count, color] = items.split(" ");
    if (bag[color as keyof typeof bag] < parseInt(count, 10)) {
      return false;
    }
  }
  return true;
}



function lineToValue(line: string) {
  const [game, info] = line.split(": ")
  return info.split("; ").reduce((possibility, game) => possibility && validGame(game), true) ? parseInt(game.substring(5)) : 0;
}

function lineToPower(line: string) {
  const [_, info] = line.split(": ")
  const min = {red: 0, green: 0, blue: 0};
  info.split("; ").forEach((game) => {
    for (const items of game.split(", ")) {
      const [countS, color] = items.split(" ");
      const count = parseInt(countS, 10);
      if (count > min[color as keyof typeof min]) {
        min[color as keyof typeof min] = count;
      }
    }
  });
  log.debug(line, min.red, min.blue, min.green, min.red * min.blue * min.green)
  return min.red * min.blue * min.green;
}

function part1(input: string): string {
  log.debug("solution.day", "running part1")
  return inputToLines(input).reduce((total, line) => total + lineToValue(line), 0).toString();
}

function part2(input: string): string {
  log.debug("solution.day", "running part2", input)
  return inputToLines(input).reduce((total, line) => total + lineToPower(line), 0).toString();
}

export { part1, part2 };