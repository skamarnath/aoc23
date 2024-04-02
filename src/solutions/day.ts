import log from "../utils/log.ts";
import { inputToLines } from "../utils/string.ts";

function part1(input: string): string {
  log.debug("solution.day", "running part1")
  return inputToLines(input).join("\n");
}

function part2(input: string): string {
  log.debug("solution.day", "running part2")
  return inputToLines(input).join("\n");
}

export { part1, part2 };