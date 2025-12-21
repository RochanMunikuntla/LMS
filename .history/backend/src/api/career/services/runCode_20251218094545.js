import axios from "axios";

export const runCode = async (language_id, source_code, stdin = "") => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",  // send raw text
      wait: "true",             // return result in same request
      fields: "*"               
    },
    headers: {
      "x-rapidapi-key": process.env.JUDGE0_API_KEY,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json"
    },
    data: {
      language_id,
      source_code,
      stdin
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Judge0 Error:", error.response?.data || error.message);
    throw error;
  }
};
