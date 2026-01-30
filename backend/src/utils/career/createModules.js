import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import slugify from "slugify";
import OpenAI from "openai";

import Roadmap from "../../api/career/models/roadmap.js";
import Module from "../../api/career/models/module.js";
import Topic from "../../api/career/models/topic.js";


const client = new OpenAI();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPythonRoadmap() {
    console.log("🚀 Starting Python Roadmap generation...\n");

    /* -------------------- LOAD MODULES JSON -------------------- */

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI not set in environment variables");
    }

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected");


    const filePath = path.join(__dirname, "pythonModules.json");
    if (!fs.existsSync(filePath)) {
        throw new Error(`pythonModules.json not found at ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const modulesJson = JSON.parse(raw);

    /* -------------------- CREATE ROADMAP -------------------- */

    console.log("📘 Creating roadmap: Python");

    const roadmap = await Roadmap.create({
        slug: "python",
        title: "Python",
        description:
            "A beginner-friendly roadmap covering Python fundamentals, data structures, problem solving, and introdution to object-oriented programming.",
        domain: "Programming",
        level: "beginner",
        modules: []
    });

    console.log(`✅ Roadmap created: ${roadmap.title}\n`);

    /* -------------------- CREATE MODULES + TOPICS -------------------- */

    let moduleIndex = 1;
    let totalTopicsGenerated = 0;

    for (const [moduleTitle, topics] of Object.entries(modulesJson)) {
        console.log(`📦 Creating module (${moduleIndex}): ${moduleTitle}`);

        const moduleDoc = await Module.create({
            index: moduleIndex,
            roadmap: roadmap._id,
            title: moduleTitle,
            slug: slugify(moduleTitle, { lower: true }),
            description: `Module covering ${moduleTitle.toLowerCase()}.`,
            topics: []
        });

        roadmap.modules.push(moduleDoc._id);

        let topicIndex = 1;

        let LANGUAGE_CODE_ALLOWED = moduleTitle !== "Basic Problem Solving with Collections";

        for (const topicTitle of topics) {
            console.log(
                `   🧠 Generating topic ${moduleIndex}.${topicIndex} → ${topicTitle}`
            );


            const prompt = `You are generating structured learning content for an LMS.
            The output will be stored directly in a database. 
            All text must be neutral, instructional, and free of narration or conversational tone.
            
            --------------------------------
            CONTEXT
            --------------------------------
            
            Module: ${moduleTitle}
            Topic: ${topicTitle}
            
            The learner:
            - Writes Python code in an editor
            - Code is executed using stdin/stdout
            - Output is validated by comparing stdout with expectedOutput
            
            --------------------------------
            STRICT OUTPUT RULES
            --------------------------------
            
            - Output JSON only. Your output is being parsed and being seeded into the DB so MAKE SURE YOUR OUTPUT IS VALID JSON
            - Do NOT include markdown
            - Do NOT include narration or introductory phrases
            - Do NOT include phrases like:
              - "This topic teaches"
              - "In this topic"
              - "You will learn"
            - Content must be directly storable in a database
            - All descriptions must be concise, instructional, and precise
            - All string values MUST be valid JSON strings
            - Escape all backslashes as \\ 
            - Escape all double quotes inside strings
            - Do NOT use raw newlines inside strings; use \\n

            --------------------------------
            JSON STRUCTURE (MUST MATCH EXACTLY)
            --------------------------------
            
            {
              "contentBlocks": [
                {
                  "type": "<block_type>",
                  "data": <block_data>
                }
              ],
              "sampleTestCases": [
                {
                  "input": "<stdin>",
                  "output": "<stdout>",
                  "explanation": "<reason>"
                }
              ],
              "executionTestCases": [
                {
                  "input": "<stdin>",
                  "expectedOutput": "<stdout>"
                }
              ]
            }
            
            --------------------------------
            CONTENT BLOCK TYPES
            --------------------------------
            
            Allowed content block types:
            
            - concept_overview          → clear, descriptive paragraph explaining the topic to student
            - algorithm_explanation     → array of ordered steps
            - pseudocode                → string
            - language_code             → object { language, code }
            - constraints               → array of mathematical / formal constraints
            - complexity                → object with 4 fields
            - task                      → clear task statement for student to practice
            - solution                  → runnable python code for the task given to help students struggling with the task
            
            --------------------------------
            CONTENT BLOCK RULES
            --------------------------------
            
            1. concept_overview
            - MUST be a descriptive paragraph explaining the concept
            - NO narration
            - Example style:
              - "Linear search is a basic algorithm that checks each element in a list sequentially to determine
                if a target value exists. Iterate through the list,
                compare each element to the target,
                and print the index of the first occurrence if found,
                or 'Not found' if the target element is not present in the list."
            
            2. algorithm_explanation
            - Step-by-step execution logic
            - Describe input reading, looping, comparison, output
            - Ordered and explicit
            
            3. pseudocode
            - Language-agnostic
            - Indentation-based
            - No Python-specific syntax
            
            4. language_code
            - Generate this block ONLY if ${LANGUAGE_CODE_ALLOWED} is true. If ${LANGUAGE_CODE_ALLOWED} is false, DO NOT include this block at all
            - Use beginner-friendly constructs ONLY
            - DO NOT use enumerate()
            - Use index-based loops:
              for i in range(0, len(arr)):
            - Must use input() and print()
            
            5. constraints
            - MUST be in formal constraint format
            - NO plain English
            - Example formats:
              - "0 ≤ n ≤ 10^5"
              - "-10^9 ≤ arr[i] ≤ 10^9"
              - "0 ≤ target ≤ 10^9"
            
            6. complexity
            - MUST contain exactly these fields:
            {
              "time": "O(...)",
              "timeExplanation": "<reason>",
              "space": "O(...)",
              "spaceExplanation": "<reason>"
            }
            - The complexity expression must be alone in 'time' and 'space'
            
            7. task
            - MUST be different from the language_code in order to maximize student learning
            - clear descriptive statement for student to execute the code on his own
            - Task must align with the topic
            - Written as an instruction, not narration
            - Must assume stdin/stdout judging
            Example style:
            - "Read a list of integers and a target value, then print the index of the first occurrence of the target or -1."

            8. solution
            - MUST be the python code of the task given by you
            - clean runnable python code which passes all the test cases for the task given by you
            - Use beginner-friendly constructs ONLY
            - DO NOT use enumerate()
            - Use index-based loops:
              for i in range(0, len(arr)):
            - Must use input() and print()
            
            
            --------------------------------
            TEST CASE RULES
            --------------------------------
            For ALL test cases:
            - The "input" field MUST be a non-empty string.
            If a test case does not require input, explicitly set:
            "input": "No input"
            - Never use an empty string for input.
            - The "output" field MUST NEVER be empty.
            - Every sample test case MUST specify the exact stdout produced.
            - If the topic does not naturally produce output, define a minimal observable output.
            - Do NOT use empty strings for output under any circumstances.


            sampleTestCases:
            - EXACTLY 2
            - One normal case
            - One edge case
            - Include explanation
            
            executionTestCases:
            - MUST include hidden edge cases
            - Include multiple cases
            - No explanations
            
            --------------------------------
            BEGINNER-SPECIFIC RULES
            --------------------------------
            
            - Avoid advanced constructs (enumerate, list comprehensions if unnecessary)
            - Prefer explicit loops and conditionals
            - Code clarity is more important than conciseness
            
            --------------------------------
            FINAL INSTRUCTION
            --------------------------------
            
            Generate content strictly following the schema and rules above.`

            const response = await client.responses.create({
                model: "gpt-4.1",
                input: prompt,
                temperature: 0.2
            });

            let parsed;
            try {
                parsed = JSON.parse(response.output_text);
            } catch (err) {
                console.error("❌ Invalid JSON from GPT");
                throw err;
            }

            const topicDoc = await Topic.create({
                module: moduleDoc._id,
                index: topicIndex,
                title: topicTitle,
                slug: slugify(topicTitle, { lower: true }),
                contentBlocks: parsed.contentBlocks,
                sampleTestCases: parsed.sampleTestCases,
                executionTestCases: parsed.executionTestCases,
                allowedLanguages: ["python"]
            });

            moduleDoc.topics.push(topicDoc._id);

            console.log(`   ✅ Topic saved: ${topicTitle}`);
            topicIndex++;
            totalTopicsGenerated++;
        }

        await moduleDoc.save();
        console.log(`📦 Module completed: ${moduleTitle}\n`);
        moduleIndex++;
    }

    await roadmap.save();

    console.log("🎉 Python Roadmap generation completed!");
    console.log(`📊 Total topics generated: ${totalTopicsGenerated}`);
}

/* -------------------- RUN -------------------- */

createPythonRoadmap()
    .then(() => mongoose.disconnect())
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
