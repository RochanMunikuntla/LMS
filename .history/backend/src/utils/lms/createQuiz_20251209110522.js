import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";

export async function seedQuiz(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    const importId = uuidv4();
    const questions = data.questions || [];

    for (const q of questions) {
      if (q.type === "mcq") {
        await careerQuestion.create({
          importId,
          question: q.question,
          type: "mcq",
          options: q.options.map(opt => ({
            option: opt.option,
            isCorrect: !!opt.isCorrect,
            explanation: opt.explanation || ""
          }))
        });
      }

      if (q.type === "numerical") {
        await careerQuestion.create({
          importId,
          question: q.question,
          type: "numerical",
          numerical: {
            value: q.numerical?.value,
            explanation: q.numerical?.explanation || ""
          }
        });
      }
    }

    return { importId };

  } catch (err) {
    console.error("seedQuiz error:", err);
    throw err; // let controller catch it
  }
}
