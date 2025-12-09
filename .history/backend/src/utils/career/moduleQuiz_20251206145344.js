import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "module.json");

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

console.log(data);


