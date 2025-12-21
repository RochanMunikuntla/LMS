import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

export const batchRunCode = async (submissions) => {
  try {
    const response = await axios.post(
      `${JUDGE0_URL}/submissions/batch`,
      { submissions },
      {
        params: {
          base64_encoded: "true",
          wait: "true",
          fields: "*"
        },
        headers: {
          "x-rapidapi-key": process.env.JUDGE0_API_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json"
        }
      }
    );

    let data = response.data;

    if (Array.isArray(data.submissions) && data.submissions[0]?.token) {
      console.log("Judge0 returned tokens — polling results...");

      const tokens = data.submissions.map((s) => s.token);

      const results = await pollBatchResults(tokens);

      return { submissions: results };
    }

    return data;

  } catch (error) {
    console.error("Batch Submission Error:", error.response?.data || error.message);
    throw error;
  }
};


const pollBatchResults = async (tokens) => {
  const results = [];

  for (const token of tokens) {
    const result = await pollSingleSubmission(token);
    results.push(result);
  }

  return results;
};


const pollSingleSubmission = async (token) => {
  const maxAttempts = 10;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;

    try {
      const res = await axios.get(
        `${JUDGE0_URL}/submissions/${token}`,
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          }
        }
      );

      const data = res.data;

      if (data.status?.id > 2) {
        return data;
      }

      await new Promise((r) => setTimeout(r, 400));

    } catch (err) {
      console.error("Polling error:", err.message);
    }
  }

  throw new Error(`Timeout polling token ${token}`);
};
