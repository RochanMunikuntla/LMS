import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "pythonArrays.json");

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

export const parse

console.log(data.quizMetadata);


