import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import lmsQuestion from "../../api/lms/models/lmsQuestions.js";

export async function seedQuiz(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(raw);

    const importId = uuidv4();

    let qIndex = 1; // 👈 question index auto-increment

    for (const q of questions) {

      // ===== MCQ =====
      if (q.type === "mcq") {
        const optionsWithIndex = q.options.map((opt, i) => ({
          index: i,                 // 👈 option index
          option: opt.option,
          isCorrect: opt.isCorrect,
          explanation: opt.explanation
        }));

        await lmsQuestion.create({
          importId,
          index: qIndex,                    // 👈 stored
          question: q.question,
          type: "mcq",
          marks: q.marks,
          options: optionsWithIndex
        });

        qIndex++; // 👈 increment after insert
      }

      // ===== NUMERICAL =====
      if (q.type === "numerical") {
        await lmsQuestion.create({
          importId,
          index: qIndex,
          question: q.question,
          type: "numerical",
          marks: q.marks,
          answer: q.answer,
          tolerance: q.tolerance
        });

        qIndex++;
      }
    }

    return { importId };

  } catch (err) {
    console.error("seedQuiz error:", err);
    throw err;
  }
}
