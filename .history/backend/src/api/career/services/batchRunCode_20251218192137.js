import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const HEADERS = {
    "x-rapidapi-key": process.env.JUDGE0_API_KEY,
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
};

const decodeBase64 = (str) => {
    if (!str) return null;
    return Buffer.from(str, "base64").toString("utf8");
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

    const submissionsResp = Array.isArray(initial)
        ? initial
        : initial.submissions;

    if (!Array.isArray(submissionsResp)) {
        throw new Error("Invalid Judge0 response shape");
    }

    const decodeAll = (arr) =>
        arr.map(s => ({
            ...s,
            stdout: decodeBase64(s.stdout),
            stderr: decodeBase64(s.stderr),
            compile_output: decodeBase64(s.compile_output)
        }));

    const normalizeSubmission = (s) => ({
        stdout: s.stdout?.trim() ?? "",
        stderr: s.stderr ?? null,
        status: s.status?.description ?? "Unknown",
        statusId: s.status?.id ?? null,
        time: s.time ?? null,
        memory: s.memory ?? null
    });

    // ✅ Case 1: Judge0 returned finished results immediately
    const allFinished = submissionsResp.every(
        (s) => s.status && s.status.id > 2
    );

    if (allFinished) {
        const decoded = decodeAll(submissionsResp);
        return { submissions: decoded.map(normalizeSubmission) };
    }

    // ✅ Case 2: Judge0 returned tokens → poll
    const tokens = submissionsResp
        .filter(s => s.token)
        .map(s => s.token);

    if (tokens.length === 0) {
        throw new Error("No tokens returned by Judge0");
    }

    const results = await getBatch(tokens);

    const finalSubmissions = Array.isArray(results)
        ? results
        : results.submissions;

    const decoded = decodeAll(finalSubmissions);

    return { submissions: decoded.map(normalizeSubmission) };
};
