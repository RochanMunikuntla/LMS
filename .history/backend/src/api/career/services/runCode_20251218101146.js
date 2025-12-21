import axios from "axios";

export const runCode= async (language_id, source_code, stdin = "") => {
  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        language_id,
        source_code,
        stdin
      },
      {
        params: {
          base64_encoded: "false",
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

    return response.data;

  } catch (err) {
    console.error("Judge0 Error:", err.response?.data || err.message);
    throw err;
  }
};
