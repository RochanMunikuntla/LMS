import { parse } from "gift-pegjs";
import { careerQuestion } from "../../api/career/models/careerQuiz.js";
import fsd from "fs/promises";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'

function extractNumericFromQuestion(q) {
  // Return a Number or null
  if (!q || typeof q !== "object") return null;

  // Helper: parse a string and return number if it contains a clear numeric answer
  const parseNumberFromString = (str) => {
    if (typeof str !== "string") return null;
    // Remove non-printable, normalize
    const s = str.trim();
    if (!s) return null;

    // 1) Prefer explicit GIFT numeric token like "#5" or "#{5}" etc.
    // match #  optional spaces then a number (int or float)
    const hashMatch = s.match(/#\s*(-?\d+(\.\d+)?)/);
    if (hashMatch) return Number(hashMatch[1]);

    // 2) If string itself is a plain number
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

    // 3) Otherwise try to find a standalone number token in the string
    // but avoid taking numbers that are part of words like "Q19" (we match word boundaries)
    const tokenMatch = s.match(/(?:^|\b)(-?\d+(\.\d+)?)(?:\b|$)/);
    if (tokenMatch) return Number(tokenMatch[1]);

    return null;
  };

  // Check q.answer in a few safe shapes:
  if (q.answer !== undefined && q.answer !== null) {
    // Some ASTs: answer may be a primitive, string, or object {text: "..."} or {number: 5}
    if (typeof q.answer === "number") return q.answer;
    if (typeof q.answer === "string") {
      const n = parseNumberFromString(q.answer);
      if (n !== null) return n;
    }
    if (typeof q.answer === "object") {
      // object with .number
      if (q.answer.number !== undefined && typeof q.answer.number === "number") return q.answer.number;
      if (q.answer.text) {
        const n = parseNumberFromString(String(q.answer.text));
        if (n !== null) return n;
      }
      // sometimes q.answer may itself be nested; try safe keys
      if (q.answer.value !== undefined) {
        const n = parseNumberFromString(String(q.answer.value));
        if (n !== null) return n;
      }
    }
  }

  // Some parsers put numeric answer in q.number (but beware: q.number often equals question index)
  // Only accept q.number if q.number looks like an answer (and q.answer is not present)
  if ((q.answer === undefined || q.answer === null) && q.number !== undefined) {
    // q.number might be object or primitive
    if (typeof q.number === "number") {
      // Heuristic: accept if the number is small and plausible (e.g., < 1e6)
      return q.number;
    }
    if (typeof q.number === "string") {
      const n = parseNumberFromString(q.number);
      if (n !== null) return n;
    }
    if (typeof q.number === "object" && q.number !== null && q.number.number !== undefined && typeof q.number.number === "number") {
      return q.number.number;
    }
  }

  // Check choices: sometimes numeric answer is encoded as the correct choice's text
  if (Array.isArray(q.choices) && q.choices.length > 0) {
    for (const ch of q.choices) {
      // If a choice is marked correct, prefer it
      if (ch && (ch.isCorrect === true || ch.correct === true)) {
        // choice.text may be nested
        const txt = (ch.text && (typeof ch.text === "string") ? ch.text : (ch.text.text ?? null)) (|| ch.text ?? null;
        const n = parseNumberFromString(String(txt || ""));
        if (n !== null) return n;
      }
    }
    // if no choice flagged correct, try the first choice as fallback
    const first = q.choices[0];
    if (first) {
      const txt = (first.text && (typeof first.text === "string" ? first.text : (first.text.text ?? null))) || first.text ?? null;
      const n = parseNumberFromString(String(txt || ""));
      if (n !== null) return n;
    }
  }

  // As a last safe measure, inspect q.value / q.min / q.max only if they exist and look numeric
  if (q.value !== undefined) {
    const n = parseNumberFromString(String(q.value));
    if (n !== null) return n;
  }
  if (q.min !== undefined) {
    const n = parseNumberFromString(String(q.min));
    if (n !== null) return n;
  }

  // Not found
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
