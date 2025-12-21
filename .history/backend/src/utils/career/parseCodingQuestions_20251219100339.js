import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'codingQuestions.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = json.parse(raw)
console.log(data)