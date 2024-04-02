import log from "../utils/log.ts";
import { inputToLines } from "../utils/string.ts";

const wordNumberMap = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine"
}

function currentValue(line: string) {
  const length = line.length - 1;
  let left: string | null = null, right: string | null = null;
  let i = 0;
  while ((!left || !right) && i <= length) {
    if (!left && line[i] >= '0' && line[i] <= '9') left = line[i];
    if (!right && line[length - i] >= '0' && line[length - i] <= '9') right = line[length - i];
    i++;
  }
  log.debug(`line: ${line}`, `${left || 0}${right || 0}`);
  return parseInt(`${left || 0}${right || 0}`, 10);
}

function matchStringNumber(line: string, index: number): string | null {
  for (const key in wordNumberMap) {
    const stringForm = wordNumberMap[key as keyof typeof wordNumberMap];
    const extractedString = line.substring(index, index + stringForm.length);
    if(stringForm === extractedString) {
      return key;
    }
  }
  return null;
}

function currentValueWithString(line: string) {
  const length = line.length - 1;
  let left: string | null = null, right: string | null = null;
  let i = 0;
  while ((!left || !right) && i <= length) {
    if (!left) {
      if (line[i] >= '0' && line[i] <= '9') left = line[i];
      const tempLeft = matchStringNumber(line, i);
      if(tempLeft) left = tempLeft;
    }
    if (!right) { 
      if(line[length - i] >= '0' && line[length - i] <= '9') right = line[length - i];
      const tempRight = matchStringNumber(line, length - i);
      if(tempRight) right = tempRight;
    } 
    i++;
  }
  log.debug(`line: ${line}`, `${left || 0}${right || 0}`);
  return parseInt(`${left || 0}${right || 0}`, 10);
}

function part1(input: string): string {
  return inputToLines(input).reduce((total, line) => total + currentValue(line), 0).toString();
}

function part2(input: string): string {
  return inputToLines(input).reduce((total, line) => total + currentValueWithString(line), 0).toString();
}

export { part1, part2 };