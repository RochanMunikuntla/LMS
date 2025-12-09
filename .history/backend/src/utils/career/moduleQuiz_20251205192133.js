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
    const s = str.trim();
    if (!s) return null;

    // 1) Prefer explicit GIFT numeric token like "#5"
    const hashMatch = s.match(/#\s*(-?\d+(\.\d+)?)/);
    if (hashMatch) return Number(hashMatch[1]);

    // 2) If string itself is a plain number
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

    // 3) Standalone number token
    const tokenMatch = s.match(/(?:^|\b)(-?\d+(\.\d+)?)(?:\b|$)/);
    if (tokenMatch) return Number(tokenMatch[1]);

    return null;
  };

  // 1. Check q.answer (direct answer)
  if (q.answer !== undefined && q.answer !== null) {
    if (typeof q.answer === "number") return q.answer;
    if (typeof q.answer === "string") {
      const n = parseNumberFromString(q.answer);
      if (n !== null) return n;
    }
    if (typeof q.answer === "object") {
      if (typeof q.answer.number === "number") return q.answer.number;
      if (typeof q.answer.value === "number") return q.answer.value; // Common in some ASTs
      if (q.answer.text) {
        const n = parseNumberFromString(String(q.answer.text));
        if (n !== null) return n;
      }
    }
  }

  // 2. Check q.number (sometimes used for simple numeric types)
  if ((q.answer === undefined || q.answer === null) && q.number !== undefined) {
    if (typeof q.number === "number") return q.number;
    if (typeof q.number === "string") {
      const n = parseNumberFromString(q.number);
      if (n !== null) return n;
    }
  }

  // 3. Check choices (Most GIFT numericals live here)
  if (Array.isArray(q.choices) && q.choices.length > 0) {
    for (const ch of q.choices) {
      // Numerical answers in GIFT usually imply the choice isCorrect
      if (ch && (ch.isCorrect === true || ch.correct === true)) {
        
        // A) Direct numeric properties on the choice object
        if (typeof ch.number === 'number') return ch.number;
        if (typeof ch.equals === 'number') return ch.equals; // Exact match syntax
        if (typeof ch.min === 'number') return ch.min;       // Range syntax
        
        // B) Extract text from nested structures safely
        let rawText = null;
        
        if (typeof ch.text === "string") {
            rawText = ch.text;
        } else if (typeof ch.text === "number") {
            return ch.text; 
        } else if (typeof ch.text === "object" && ch.text !== null) {
            // Check deep properties before stringifying
            if (typeof ch.text.number === 'number') return ch.text.number;
            rawText = ch.text.text || ch.text.value || ch.text.content || null;
        }

        // C) Parse the extracted text
        if (rawText !== null) {
             const n = parseNumberFromString(String(rawText));
             if (n !== null) return n;
        }
      }
    }
    
    // Fallback: If no "isCorrect" flag is found, checking the first choice 
    // is common for simple numericals where the parser might not set flags correctly.
    const first = q.choices[0];
    if (first) {
         if (typeof first.number === 'number') return first.number;
         
         let rawText = null;
         if (typeof first.text === "string") rawText = first.text;
         else if (typeof first.text === "object" && first.text !== null) {
            rawText = first.text.text || null;
         }
         
         if (rawText) {
            const n = parseNumberFromString(String(rawText));
            if (n !== null) return n;
         }
    }
  }

  // 4. Last resort: top-level numeric constraints
  if (typeof q.value === "number") return q.value;
  if (typeof q.min === "number") return q.min;

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

    const answerNumber = extractNumeric(q);

    if (answerNumber === null) {
      return { ok: false, reason: "Numeric answer not found", raw: q };
    }

    const mongoDoc = new careerQuestion({
      importId,
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
