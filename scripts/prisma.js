import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const prismaArgs = args.length === 1 && args[0] === "db:seed" ? ["db", "seed"] : args;
const result = spawnSync("prisma", prismaArgs, { stdio: "inherit", shell: process.platform === "win32" });

process.exit(result.status ?? 1);
