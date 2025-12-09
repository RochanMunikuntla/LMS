import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'

function extractValue(obj, depth = 0) {
  if (depth > 10) return null; 
  if (obj === null || obj === undefined) return null;


  if (typeof obj === 'string' || typeof obj === 'number') {
    if (String(obj).trim() === '') return null;
    const n = Number(cleaned);
    return isNaN(n) ? null : n;
  }


  if (Array.isArray(obj) && obj.length > 0) {
    return extractValue(obj[0], depth + 1);
  }


  if (typeof obj === 'object') {
    if (obj.number !== undefined) {
      if (typeof obj.number === 'object' && obj.number !== null && obj.number.number !== undefined) {
        return extractValue(obj.number.number, depth + 1);
      }
      return extractValue(obj.number, depth + 1);
    }


    if (obj.min !== undefined) return extractValue(obj.min, depth + 1);


    if (obj.value !== undefined) return extractValue(obj.value, depth + 1);


    if (obj.text !== undefined) return extractValue(obj.text, depth + 1);


    if (obj.answer !== undefined) return extractValue(obj.answer, depth + 1);


    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const result = extractValue(obj[key], depth + 1);
        if (result !== null) return result;
      }
    }
  }

  return null;
}

async function handleMC(q, importId) {
  try {
    const question = q.stem?.text?.trim() || "";
    const choices = Array.isArray(q.choices) ? q.choices : [];

    const options = choices.map((c) => ({
      option: c?.text?.text ?? c?.text ?? "",
      isCorrect: Boolean(c?.isCorrect),
      explanation: c?.feedback?.text ?? "",
    }));

    const hasValidOptions = Array.isArray(options) && options.length >= 2;
    const hasCorrect = options.some((o) => o.isCorrect === true);

    if (!question || !hasValidOptions || !hasCorrect) {
      return { ok: false, reason: "MC validation failed", raw: q };
    }

    const mongoDoc = new careerQuestion({
      importId: importId,
      type: "MC",
      question,
      options
    });
    await mongoDoc.save();
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message, raw: q };
  }
}


async function handleTF(q, importId) {
  try {
    const question = q.stem?.text?.trim() || "";
    let answer = undefined;


    if (typeof q.isTrue === "boolean") {
      answer = q.isTrue;
    } else if (typeof q.isFalse === "boolean") {
      answer = !q.isFalse;
    }

    else if (Array.isArray(q.choices) && q.choices.length > 0) {
      const firstChoice = q.choices[0];

      if (firstChoice.isCorrect === true) {
        const text = (firstChoice.text?.text ?? firstChoice.text ?? "").toString().trim().toUpperCase();
        if (["T", "TRUE"].includes(text)) answer = true;
        else if (["F", "FALSE"].includes(text)) answer = false;
      } else if (typeof firstChoice.isTrue === "boolean") {
        answer = firstChoice.isTrue;
      } else if (typeof firstChoice.isFalse === "boolean") {
        answer = !firstChoice.isFalse;
      }
    }


    if (answer === undefined && q.answer !== undefined) {
      let val = q.answer;
      if (typeof val === 'object' && val !== null && val.text) val = val.text;
      const strVal = String(val).trim().toUpperCase();
      if (["T", "TRUE", "1", "YES"].includes(strVal)) answer = true;
      if (["F", "FALSE", "0", "NO"].includes(strVal)) answer = false;
    }

    if (!question) return { ok: false, reason: "Empty question", raw: q };
    if (typeof answer !== "boolean") {
      return { ok: false, reason: "TF answer not boolean", raw: q };
    }

    const mongoDoc = new careerQuestion({
      importId: importId,
      type: "TF",
      question,
      answer
    });
    await mongoDoc.save();
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message, raw: q };
  }
}


async function handleShort(q, importId) {
  try {
    const question = q.stem?.text?.trim() || "";
    const choices = Array.isArray(q.choices) ? q.choices : [];

    const answers = choices
      .filter(c => c.isCorrect === true)
      .map((c) => {
        if (c?.text?.text) return c.text.text;
        if (c?.text) return c.text;
        return "";
      })
      .map((s) => (typeof s === "string" ? s.trim() : String(s).trim()))
      .filter(Boolean);

    if (!question) return { ok: false, reason: "Empty question", raw: q };
    if (!Array.isArray(answers) || answers.length === 0) {
      return { ok: false, reason: "No short answers", raw: q };
    }

    const mongoDoc = new careerQuestion({
      importId: importId,
      type: "Short",
      question,
      answers
    });
    await mongoDoc.save();
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message, raw: q };
  }
}


async function handleNumerical(q, importId) {
  try {
    const question = q.stem?.text?.trim() || "";
    let answerNumber = null;


    if (Array.isArray(q.choices) && q.choices.length > 0) {
      for (const choice of q.choices) {
        answerNumber = extractValue(choice);
        if (answerNumber !== null) break;
      }
    }


    if (answerNumber === null) {

      answerNumber = extractValue(q.answer)
        ?? extractValue(q.number)
        ?? extractValue(q.value)
        ?? extractValue(q.min);
    }


    if (answerNumber === null) {
      for (const key in q) {
        if (q.hasOwnProperty(key) && key !== 'stem' && key !== 'type') {
          answerNumber = extractValue(q[key]);
          if (answerNumber !== null) break;
        }
      }
    }

    if (!question) {
      return { ok: false, reason: "Empty question", raw: q };
    }

    if (answerNumber === null) {
      console.log("🔍 DEBUG - Failed to find number in:", JSON.stringify(q, null, 2));
      return { ok: false, reason: "Numeric answer not found", raw: q };
    }

    const mongoDoc = new Question({
      importId: importId,
      type: "Numerical",
      question,
      answer: answerNumber
    });
    await mongoDoc.save();
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message, raw: q };
  }
}



async function dispatchAndSeed(q, importId) {
  let t = q?.type;
  if (!t) return { ok: false, reason: "Missing type", raw: q };


  if (t === "TrueFalse") t = "TF";
  if (t === "ShortAnswer") t = "Short";


  if (t === "MC") return handleMC(q, importId);
  if (t === "TF") return handleTF(q, importId);
  if (t === "Short") return handleShort(q, importId);
  if (t === "Numerical") return handleNumerical(q, importId);

  return { ok: false, reason: `Unsupported type: ${t}`, raw: q };
}


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
