import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const publicDir = "/home/ubuntu/tushar-portfolio-vercel/dist/public";

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  }));
  return nested.flat();
}

const files = await Promise.all((await collectFiles(publicDir)).map(async (path) => {
  const content = await readFile(path);
  const extension = path.split(".").pop()?.toLowerCase();
  const binary = ["png", "pdf", "ico", "webp"].includes(extension ?? "");
  return {
    file: relative(publicDir, path).replaceAll("\\", "/"),
    data: binary ? content.toString("base64") : content.toString("utf8"),
    encoding: binary ? "base64" : "utf-8",
  };
}));

await writeFile("/tmp/tushar-portfolio-pwa-vercel-input.json", JSON.stringify({
  name: "tushar-portfolio-live",
  target: "production",
  files,
}));
