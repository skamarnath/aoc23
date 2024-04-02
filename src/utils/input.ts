import { join, dirname } from "https://deno.land/std@0.221.0/path/mod.ts";
import log from "./log.ts";

const inputCacheDir = new URL('../../.input-cache/', import.meta.url).pathname;

const getRemoteURL = (day: string) => `https://adventofcode.com/2023/day/${day}/input`;
const getCacheFilePath = (day: string) => join(inputCacheDir, `./day-${day}/input`);

function fetchFromRemote(day: string): Promise<string> {
  return fetch(getRemoteURL(day), {
    "headers": {
      "cookie": env["cookie"],
    },
    "method": "GET"
  }).then(res => res.text())
}

function statCache(day: string) : Promise<boolean> {
  return Deno.stat(getCacheFilePath(day)).then(info => info.isFile).catch(() =>  false);
}

async function writeCache(day: string, input: string): Promise<void> {
  const filePath = getCacheFilePath(day);
  await Deno.mkdir(dirname(filePath), {recursive: true});
  await Deno.writeTextFile(filePath, input); 
}

function readCache(day: string): Promise<string> {
  return Deno.readTextFile(getCacheFilePath(day)); 
}

export async function fetchInput(day: string): Promise<string> {
  if(await statCache(day)) {
    log.debug("utils.input", "cache hit")
    return readCache(day);
  } else {
    log.debug("utils.input", "cache missed")
    const input = await fetchFromRemote(day);
    await writeCache(day, input);
    return input;
  }
}