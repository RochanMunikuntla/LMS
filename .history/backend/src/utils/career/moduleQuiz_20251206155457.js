import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// adjust path to your model as needed
import { careerQuestion } from "../../api/career/models/careerQuiz.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "pythonArrays.json");

// --- keep your parseQuiz logic or require it if separate ---
// I'll reuse the parsing inline for a single-file drop-in:

function parseQuizFromFile() {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const importId = uuidv4();
  const questions = data.questions;
  const parsedQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (q.type === "mcq") {
      const options = (q.options || []).map(opt => ({
        option: opt.option,
        isCorrect: !!opt.isCorrect,
        explanation: opt.explanation || ""
      }));

      parsedQuestions.push({
        importId,
        question: q.question,
        type: "mcq",
        options
      });
    } else if (q.type === "numerical") {
      parsedQuestions.push({
        importId,
        question: q.question,
        type: "numerical",
        numerical: {
          value: q.numerical?.value,
          explanation: q.numerical?.explanation || ""
        }
      });
    }
    // add more types here if needed in future
  }

  return { importId, parsedQuestions };
}

/**
 * Seed quiz questions one-by-one and return the importId and summary.
 * Controller can call: const { importId, insertedCount } = await seedQuiz();
 */
export async function seedQuiz() {
  try {
    const { importId, parsedQuestions } = parseQuizFromFile();

    const insertedIds = [];
    const errors = [];

    // insert one-by-one so failures are per-item and easier to debug
    for (let i = 0; i < parsedQuestions.length; i++) {
      const q = parsedQuestions[i];
      try {
        const doc = await careerQuestion.create(q); // creates & saves
        insertedIds.push(doc._id);
      } catch (err) {
        // collect error but continue
        errors.push({ index: i, reason: err.message, question: q.question?.slice(0, 120) });
        console.error(`Failed to insert question index=${i}:`, err.message);
      }
    }

    return {
      ok: true,
      importId,
      insertedCount: insertedIds.length,
      total: parsedQuestions.length,
      errors
    };
  } catch (err) {
    console.error("seedQuiz failed:", err);
    return { ok: false, reason: err.message };
  }
}
