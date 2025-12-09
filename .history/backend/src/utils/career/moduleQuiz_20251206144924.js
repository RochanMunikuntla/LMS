import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'


export async function moduleQuiz(filePath) {
  let importId = null;
  try {
    importId = uuidv4();

    let jsonText = fs.readFileSync("", "utf8");


    console.log(jsonText.quizMetadata);

    // const report = {
    //   total: parsed.length,
    //   seeded: 0,
    //   skipped: 0,
    //   errors: [],
    // };
  } finally {
    await fsd.unlink(filePath).catch(() => { });
  }

  return { importId };
};
