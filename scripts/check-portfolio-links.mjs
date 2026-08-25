import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
const urls = [...new Set([...source.matchAll(/link:\s*"(https:\/\/[^\"]+)"/g)].map((match) => match[1]))];

if (urls.length === 0) {
  throw new Error("No portfolio project links were found.");
}

async function request(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    return await fetch(url, { method, redirect: "follow", signal: controller.signal, headers: { "user-agent": "Tushar-Portfolio-Link-Check/1.0" } });
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(urls.map(async (url) => {
  try {
    let response = await request(url, "HEAD");
    if (response.status === 405 || response.status === 501) response = await request(url, "GET");
    return { url, status: response.status, ok: response.status >= 200 && response.status < 400 };
  } catch (error) {
    return { url, status: error instanceof Error ? error.name : "request-error", ok: false };
  }
}));

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.url}`);
}

const failed = results.filter((result) => !result.ok);
if (failed.length) process.exitCode = 1;
