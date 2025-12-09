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
      if (questions[i].type == 'mcq') {
        let optionsLength = questions[i].options.length;
        let question = questions[i].question;
        let options = [];
        for (let j = 0; j < optionsLength; j++) {
          let option = questions[i].options[j].option;
          let isCorrect = questions[i].options[j].isCorrect;
          let explanation = questions[i].options[j].explanation;

          let optionObj = {
            option: option,
            isCorrect: isCorrect,
            explanation: explanation
          };

          options.push(optionObj);
        }
        console.log(question, options)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

parse


