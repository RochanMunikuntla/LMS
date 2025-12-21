import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CodingQuestion from "../../api/career/models/codingQuestions.js";
import Language from "../../api/career/models/language.js";
import ProblemCounter from "../../api/career/models/problemCounter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedCodingQuestions = async (inputFilePath) => {
  try {
    const filePath = inputFilePath;

    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    for (let i = 0; i < data.length; i++) {
      let title = data[i].title;
      let slug = data[i].slug;
      let description = data[i].description;
      let inputFormat = data[i].inputFormat;
      let outputFormat = data[i].outputFormat;
      let difficulty = data[i].difficulty;

      let constraints = {
        timeLimitMs: data[i].constraints.timeLimitMs,
        memoryLimitMB: data[i].constraints.memoryLimitMB,
        inputConstraints: data[i].constraints.inputConstraints
      };

      let tags = data[i].tags;
      let testCases = data[i].testCases;
      let judge = data[i].judge;

      let languagesAllowedIds = (await Language.find({}, "_id")).map(l => l._id);

      let idealComplexity = data[i].idealComplexity;

      const counterDoc = await ProblemCounter.findOneAndUpdate(
        { difficulty },
        { $inc: { counter: 1 } },
        { new: true, upsert: true }
      );

      const prefixMap = {
        Easy: "E",
        Medium: "M",
        Hard: "H"
      };

      const problemId = `${prefixMap[difficulty]}-${counterDoc.counter}`;

      await CodingQuestion.create({
        title,
        problemId,
        slug,
        description,
        inputFormat,
        outputFormat,
        constraints,
        tags,
        difficulty,
        testCases,
        languagesAllowed: languagesAllowedIds,
        idealComplexity,
        judge
      });
    }

    console.log("✅ Coding questions seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  }
};
