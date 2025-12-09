import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";

/**
 * Parse quiz JSON and seed questions into DB.
 * 
 * @param {string} filePath - Absolute or relative path of JSON file
 * @returns {Object} { ok, importId, insertedCount, total, errors }
 */
export default async function seedQuiz(filePath) {
  try {
    // ------------------------------
    // Read + parse JSON from file
    // ------------------------------
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    const importId = uuidv4();
    const questions = data.questions || [];
    const parsedQuestions = [];

    // ------------------------------
    // Convert JSON into DB objects
    // ------------------------------
    for (const q of questions) {
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
      }

      else if (q.type === "numerical") {
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

      // Add other types here later when needed (tf, short, etc)
    }

    // ------------------------------
    // Insert into DB one-by-one
    // ------------------------------
    const errors = [];
    let insertedCount = 0;

    for (let i = 0; i < parsedQuestions.length; i++) {
      const item = parsedQuestions[i];

      try {
        await careerQuestion.create(item);
        insertedCount++;
      } catch (err) {
        errors.push({
          index: i,
          reason: err.message,
          question: item.question?.slice(0, 120)
        });
      }
    }

    return {
      ok: true,
      importId,
      total: parsedQuestions.length,
      insertedCount,
      errors
    };

  } catch (err) {
    console.error("❌ seedQuiz failed:", err);
    return {
      ok: false,
      reason: err.message
    };
  }
}
