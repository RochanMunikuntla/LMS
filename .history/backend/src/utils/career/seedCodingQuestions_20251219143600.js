import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CodingQuestion from "../../api/career/models/codingQuestions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedCodingQuestions = async (inputFilePath) => {
  try {
    const filePath = inputFilePath;

    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    for (let i = 0; i < data.length; i++) {
      let title = data[i].title;
      let slug = data[i].title;
      let description = data[i].title;
      let inputFormat = data[i].title;
      let outputFormat = data[i].title;

      let constraints = {
        timeLimitMs: data[i].constraints.timeLimitMs,
        memoryLimitMB: data[i].constraints.memoryLimitMB,
        inputConstraints: data[i].constraints.inputConstraints
      };

      let tags = data[i].tags;
      let samples = data[i].samples;
      let hiddenTests = data[i].hiddenTests;
      let judge = data[i].judge;

      
      await CodingQuestion.create({
        title,
        slug,
        description,
        inputFormat,
        outputFormat,
        constraints,
        tags,
        samples,
        hiddenTests,
        judge
      });
    }

    console.log("✅ Coding questions seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  }
};
