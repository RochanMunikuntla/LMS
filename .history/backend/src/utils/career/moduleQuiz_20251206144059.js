import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'


export async function moduleQuiz(filePath) {
  let importId = null;
  try {
    let giftText = fs.readFileSync(filePath, "utf8");

    let parsed;

    if (giftText.charCodeAt(0) === 0xFEFF) giftText = giftText.slice(1);

    giftText = giftText
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\u00A0/g, " ")
      .replace(/\u200B/g, "")
      .replace(/\uFEFF/g, "");
    try {
      parsed = parse(giftText);
    } catch (err) {
      console.error("Parsing failed:", err.message);
      process.exit(1);
    }

    const report = {
      total: parsed.length,
      seeded: 0,
      skipped: 0,
      errors: [],
    };

    importId = uuidv4();

    for (let i = 0; i < parsed.length; i++) {
      const q = parsed[i];
      if (!q || (!q.type && !q.stem)) continue;

      const result = await dispatchAndSeed(q, importId);

      if (result.ok) {
        report.seeded++;
        console.log(`✅ [${i}] ${q.type} - Seeded successfully`);
        console.log(`= [${i}] ${importId}`)
      } else {
        report.skipped++;

        console.log(`\n========================================`);
        console.log(`❌ FAILED ITEM [Index ${i}]`);
        console.log(`Type: ${q.type}`);
        console.log(`Question: ${q.stem?.text?.substring(0, 60)}...`);
        console.log(`Reason: ${result.reason}`);
        console.log(`RAW JSON STRUCTURE:`);
        console.log(JSON.stringify(result.raw, null, 2));
        console.log(`========================================\n`);

        report.errors.push({
          index: i,
          type: q.type,
          reason: result.reason
        });
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 SEEDING COMPLETE!");
    console.log("=".repeat(50));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await fsd.unlink(filePath).catch(() => { });
  }

  return { importId };
};
