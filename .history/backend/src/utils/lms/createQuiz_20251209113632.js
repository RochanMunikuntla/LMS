import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { lmsQuestion } from "../../api/lms/models/lmsQuiz.js";

/**
 * seedQuiz(filePath)
 * - Accepts filePath to a JSON file that can be either:
 *   - an array of question objects (like your sample), or
 *   - { "questions": [ ... ] }
 * - Returns: { importId, total, inserted }
 */
export async function seedQuiz(filePath) {
  const importId = uuidv4();

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);

    // Accept either an array or an object with `questions`
    const questions = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.questions) ? parsed.questions : null);

    if (!questions) {
      throw new Error("Invalid file format: expected an array or { questions: [...] }");
    }

    const docs = [];
    const errors = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q || !q.question || !q.type) {
        errors.push({ index: i, reason: "Missing question text or type" });
        continue;
      }

      const type = String(q.type).toLowerCase();

      if (type === "mcq" || type === "mcq".toLowerCase()) {
        const opts = Array.isArray(q.options) ? q.options.map(opt => ({
          option: (opt?.option ?? "").toString(),
          isCorrect: !!opt?.isCorrect,
          explanation: (opt?.explanation ?? "").toString()
        })) : [];

        // If you want stricter validation (like >=2 options and 1 correct), add it here.
        docs.push({
          importId,
          question: q.question,
          type: "mcq",
          marks: q.marks ?? 1,
          options: opts
        });
      } else if (type === "numerical" || type === "number" || type === "numeric") {
        // Prefer q.numerical.value, fallback to q.answer or q.value
        const numericVal =
          q.numerical?.value ??
          q.answer ??
          q.value ??
          (Array.isArray(q.answers) && q.answers[0]) ?? null;

        if (numericVal === null || numericVal === undefined || String(numericVal).trim() === "") {
          errors.push({ index: i, reason: "Numerical question missing numeric answer" });
          continue;
        }

        const parsedNumber = Number(numericVal);
        if (Number.isNaN(parsedNumber)) {
          // If you want to accept strings like "100" that's fine; otherwise skip
          errors.push({ index: i, reason: `Numeric answer is not a number: ${numericVal}` });
          continue;
        }

        docs.push({
          importId,
          question: q.question,
          type: "numerical",
          marks: q.marks ?? 1,
          numerical: {
            value: parsedNumber,
            explanation: q.numerical?.explanation ?? q.explanation ?? ""
          }
        });
      } else {
        errors.push({ index: i, reason: `Unsupported question type: ${q.type}` });
      }
    }

    // Bulk insert. If docs.length === 0 we still return importId but inserted will be 0
    let inserted = 0;
    if (docs.length > 0) {
      const insertedDocs = await lmsQuestion.insertMany(docs, { ordered: false });
      inserted = insertedDocs.length;
    }

    // Optionally you can log errors somewhere; returning a minimal object
    return { importId, total: questions.length, inserted, errors };

  } catch (err) {
    console.error("seedQuiz error:", err);
    throw err;
  }
}
