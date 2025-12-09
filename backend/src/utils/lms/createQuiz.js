import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { lmsQuestion } from "../../api/lms/models/lmsQuiz.js";

export async function seedQuiz(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    // ❗ The file itself is an array, so data === questions array
    const questions = data; 
    const importId = uuidv4();

    for (const q of questions) {
      if (q.type === "mcq") {
        await lmsQuestion.create({
          importId,
          question: q.question,       // <– DIRECT access (your requirement)
          type: "mcq",
          marks: q.marks,
          options: q.options
        });
      }

      if (q.type === "numerical") {
        await lmsQuestion.create({
          importId,
          question: q.question,       // <– DIRECT access
          type: "numerical",
          marks: q.marks,
          numerical: q.numerical      // <– EXACT field access
        });
      }
    }

    return { importId };

  } catch (err) {
    console.error("seedQuiz error:", err);
    throw err;
  }
}
