import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "pythonArrays.json");

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

export function parseQuiz() {
  try {
    const length = data.questions.length;
    const questions = data.questions;
    for (let i = 0; i < length; i++) {
      if(questions[i].type == 'mcq'){
        let question = questions[i].question;
        let 
      }
    }
  } catch (error) {

  }
}
console.log(data.questions[0].options[0]);


