export function parseGIFT(content) {
  const questions = [];

  // Normalize line endings and remove comments.
  content = content.replace(/\r\n/g, "\n").replace(/\/\/.*$/gm, "");

  let buffer = "";
  let braceCount = 0;

  const lines = content.split("\n");
  for (let line of lines) {
    line = line.trim();
    // Skip empty lines between questions
    if (!line) {
      if (buffer && braceCount === 0) {
        // In case a question block ends without a trailing newline
        // and is followed by empty lines, we process it.
      } else {
        continue;
      }
    }

    buffer += (buffer ? "\n" : "") + line;
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;

    // A complete question block is formed when braces are balanced.
    if (braceCount === 0 && buffer) {
      // Regex to capture optional ::title::, the question text, and {answers}
      const match = buffer.match(/^(?:::(.*?)::)?([\s\S]*?)\{([\s\S]*)\}$/);
      
      if (match) {
        const title = match[1] ? match[1].trim() : "";
        const questionText = match[2].trim();
        const answerPart = match[3].trim();

        let type;
        let options = [];

        // --- ACCURATE TYPE DETECTION LOGIC ---

        // 1. MULTIPLE CHOICE: Contains '~'.
        if (answerPart.includes("~")) {
          type = "multiple_choice";
          const rawOptions = answerPart.split("~").filter(Boolean);
          options = rawOptions.map(opt => {
            let isCorrect = opt.startsWith("=");
            let text = opt.replace(/^[=~]/, "").trim();
            let feedback = "";
            let partial = 0;

            const percentMatch = text.match(/^%(-?\d+(\.\d+)?)%/);
            if (percentMatch) {
              partial = parseFloat(percentMatch[1]) / 100;
              text = text.replace(/^%(-?\d+(\.\d+)?)%/, "").trim();
            }
            
            const feedbackSplit = text.split("#");
            if (feedbackSplit.length > 1) {
              text = feedbackSplit[0].trim();
              feedback = feedbackSplit[1].trim();
            }
            return { text, isCorrect, feedback, partial };
          });
        }
        // 2. NUMERICAL: Starts with '#'.
        else if (answerPart.startsWith("#")) {
          type = "numerical";
          const numericalAnswer = answerPart.slice(1).trim();
          options.push({ text: numericalAnswer, isCorrect: true, feedback: "" });
        }
        // 3. TRUE/FALSE: The entire content is T, F, TRUE, or FALSE.
        else if (/^(T|TRUE|F|FALSE)$/i.test(answerPart)) {
          type = "true_false";
          const isTrue = /T/i.test(answerPart);
          options = [
            { text: "True", isCorrect: isTrue, feedback: "" },
            { text: "False", isCorrect: !isTrue, feedback: "" },
          ];
        }
        // 4. SHORT ANSWER: Fallback for one or more correct text answers.
        else {
          type = "short_answer";
          const answers = answerPart.split("=").filter(Boolean);
          options = answers.map(ans => {
            const [text, feedback] = ans.split("#").map(s => s.trim());
            return { text, feedback: feedback || "", isCorrect: true };
          });
        }

        questions.push({ title, text: questionText, type, options });
      }
      
      // Reset buffer for the next question
      buffer = "";
    }
  }

  return questions;
}