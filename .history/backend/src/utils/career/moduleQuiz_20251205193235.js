import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'

function extractNumericFromQuestion(q) {
  // Return a Number or null
  if (!q || typeof q !== "object") return null;

  // Helper: attempts to parse a number from any random string input
  const parseNumberFromString = (str) => {
    if (typeof str !== "string") return null;
    const s = str.trim();
    if (!s) return null;
    // Match explicit GIFT hash format like #5
    const hashMatch = s.match(/#\s*(-?\d+(\.\d+)?)/);
    if (hashMatch) return Number(hashMatch[1]);
    // Match plain number
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
    return null;
  };

  // Helper: Deeply inspect an object to find a likely numeric answer value
  const extractFromObject = (obj) => {
    if (!obj || typeof obj !== 'object') return null;

    // Priority 1: Explicit 'number' or 'value' keys
    if (typeof obj.number === 'number') return obj.number;
    if (typeof obj.value === 'number') return obj.value;

    // Priority 2: Range keys (common in {#4} -> { min: 4, max: 4 })
    if (typeof obj.min === 'number') return obj.min;
    if (typeof obj.max === 'number') return obj.max;
    if (typeof obj.equals === 'number') return obj.equals;

    return null;
  };

  // 1. Check direct answer property (if parser puts it on root)
  if (q.answer !== undefined && q.answer !== null) {
    if (typeof q.answer === "number") return q.answer;
    const fromObj = extractFromObject(q.answer);
    if (fromObj !== null) return fromObj;
    if (typeof q.answer === "string") {
      const n = parseNumberFromString(q.answer);
      if (n !== null) return n;
    }
  }

  // 2. Iterate through choices (Most likely location for {#4})
  if (Array.isArray(q.choices) && q.choices.length > 0) {
    for (const ch of q.choices) {
      if (!ch) continue;

      // Only look at choices that are marked correct OR if it's the only choice available
      const isCandidate = (ch.isCorrect === true || ch.correct === true) || q.choices.length === 1;

      if (isCandidate) {
        // A) Check properties directly on the choice object
        const directNum = extractFromObject(ch);
        if (directNum !== null) return directNum;

        // B) Check properties inside the 'text' object (Crucial for {#4})
        if (typeof ch.text === 'object' && ch.text !== null) {
          const textNum = extractFromObject(ch.text);
          if (textNum !== null) return textNum;
        }

        // C) Check string content
        let rawText = null;
        if (typeof ch.text === "string") rawText = ch.text;
        else if (ch.text && typeof ch.text.text === "string") rawText = ch.text.text;

        if (rawText) {
          const n = parseNumberFromString(rawText);
          if (n !== null) return n;
        }
      }
    }
  }

  // 3. Last Resort: Check root level numeric constraints
  if (typeof q.value === "number") return q.value;
  if (typeof q.min === "number") return q.min;

  // DEBUGGING AID: If we still haven't found it, log the structure so you can see where it's hiding.
  // Uncomment the line below if it still fails to see the exact structure in your console.
  // console.log("FAILED EXTRACT:", JSON.stringify(q, null, 2));

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

    if (!question) return { ok: false, reason: "Empty question", raw: q };



    // Use the safe extractor

    const answerNumber = extractNumericFromQuestion(q);



    if (answerNumber === null) {

      console.log("🔍 DEBUG - Failed to find number in parsed AST:", JSON.stringify(q, null, 2));

      return { ok: false, reason: "Numeric answer not found", raw: q };

    }



    const mongoDoc = new careerQuestion({

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
