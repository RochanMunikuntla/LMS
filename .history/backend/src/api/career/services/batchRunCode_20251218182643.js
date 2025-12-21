import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const HEADERS = {
  "x-rapidapi-key": process.env.JUDGE0_API_KEY,
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  "Content-Type": "application/json"
};

export const batchRunCode = async (submissions) => {
  try {
    const res = await axios.post(
      `${JUDGE0_URL}/submissions/batch`,
      { submissions },
      {
        params: {
          base64_encoded: "true",
          wait: "true",   // TRY to get results immediately
          fields: "*"
        },
        headers: HEADERS
      }
    );

    return res.data; // may contain tokens OR results

  } catch (err) {
    console.error("Batch Submit Error:", err.response?.data || err.message);
    throw err;
  }
};


export const getBatch = async (tokens) => {
  try {
    const tokenString = Array.isArray(tokens) ? tokens.join(",") : tokens;

    const res = await axios.get(
      `${JUDGE0_URL}/submissions/batch`,
      {
        params: {
          tokens: tokenString,
          base64_encoded: "true",
          fields: "*"
        },
        headers: HEADERS
      }
    );

    return res.data;

  } catch (err) {
    console.error("Batch Poll Error:", err.response?.data || err.message);
    throw err;
  }
};


export const runBatchWithAutoPoll = async (submissions) => {
  const initial = await submitBatch(submissions);

  if (initial.submissions && !initial.submissions[0].token) {
    return initial;
  }

  const tokens = initial.submissions.map((s) => s.token);

  const results = await getBatch(tokens);

  return results;
};
