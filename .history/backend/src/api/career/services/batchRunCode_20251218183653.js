import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const HEADERS = {
    "x-rapidapi-key": process.env.JUDGE0_API_KEY,
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
};

export const submitBatch = async (submissions) => {
    try {
        const res = await axios.post(
            `${JUDGE0_URL}/submissions/batch`,
            { submissions },
            {
                params: {
                    base64_encoded: "true",
                    wait: "true",
                    fields: "*"
                },
                headers: HEADERS
            }
        );

        return res.data;

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


export const batchRunCode = async (submissions) => {
    const initial = await submitBatch(submissions);
    console.log(i)
    if (!initial || !Array.isArray(initial.submissions)) {
        throw new Error("Judge0 returned an invalid response");
    }

    const submissionsResp = initial.submissions;

    const allFinished = submissionsResp.every(
        (s) => s.status && s.status.id > 2
    );

    if (allFinished) {
        return initial;
    }

    const tokens = submissionsResp
        .filter((s) => s.token)
        .map((s) => s.token);

    if (tokens.length === 0) {
        throw new Error("No tokens returned by Judge0");
    }

    const results = await getBatch(tokens);

    return results;
};
