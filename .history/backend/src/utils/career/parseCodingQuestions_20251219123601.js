import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'codingQuestions.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw)

for (let i = 0; i < data.length; i++) {
    let title = data[i].title;
    let slug = data[i].slug;
    let description = data[i].description;
    let inputFormat = data[i].inputFormat;
    let outputFormat = data[i].outputFormat;

    let timeConstraint = data[i].constraints.timeLimitMs;
    let memoryConstraint = data[i].constraints.memoryLimitMB;
    let inputConstraints = data[i].constraints.inputConstraints;



    let tags = data[i].tags;

    let samples = data[i].samples;
    let hiddenTests = data[i].hiddenTests;
    
    let judge = data[i].judge

}

