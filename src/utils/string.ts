export function inputToLines(input: string): string[] {
  return input.split("\n").filter(s => s !== "");
}