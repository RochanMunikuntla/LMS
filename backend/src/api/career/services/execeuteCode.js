import axios from "axios";

export const executeCode = async (language_id, source_code, stdin = "") => {
  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        language_id,
        source_code: Buffer.from(source_code).toString("base64"),
        stdin: Buffer.from(stdin).toString("base64")
      },
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


    if (response.data.stdout) {
      response.data.stdout = Buffer.from(response.data.stdout, "base64").toString("utf8");
    }
    if (response.data.stderr) {
      response.data.stderr = Buffer.from(response.data.stderr, "base64").toString("utf8");
    }
    if (response.data.compile_output) {
      response.data.compile_output = Buffer.from(response.data.compile_output, "base64").toString("utf8");
    }

    return response.data;

  } catch (err) {
    console.error("Judge0 Error:", err.response?.data || err.message);
    throw err;
  }
};
