import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'


export async function moduleQuiz(filePath) {
  let importId = null;
  try {
    let jsonText = fs.readFileSync(filePath, "utf8");


    // const report = {
    //   total: parsed.length,
    //   seeded: 0,
    //   skipped: 0,
    //   errors: [],
    // };

    importId = uuidv4();

    
  } finally {
    await fsd.unlink(filePath).catch(() => { });
  }

  return { importId };
};
