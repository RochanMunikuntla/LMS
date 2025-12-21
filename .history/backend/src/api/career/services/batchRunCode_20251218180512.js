import axios from "axios";

export const runBatchSubmissions = async (submissions) => {
  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions/batch",
      {
        submissions   // <-- pass the array directly
      },
      {
        params: {
          base64_encoded: "true",
          wait: "true" // get results immediately
        },
        headers: {
          "x-rapidapi-key": process.env.JUDGE0_API_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Batch Submission Error:", error.response?.data || error.message);
    throw error;
  }
};
