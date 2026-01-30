// tryParseRoadmap.js
import Roadmap from '../../api/career/models/roadmap.js';
import Module from '../../api/career/models/module.js';
import Topic from '../../api/career/models/topic.js';
import TestCase from '../../api/career/models/testCases.js';

import mongoose from "mongoose";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export async function parseRoadmap() {
    const session = await mongoose.startSession();
    let usingTransaction = true;
    try {
        session.startTransaction();
    } catch (e) {
        usingTransaction = false;
        console.warn("Transactions not supported in this environment — running without transactions.");
    }

    const opts = usingTransaction ? { session } : undefined;

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'pythonRoadmap.json');

        const file = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(file);
        const roadmap = json.roadmap;
        const modules = json.roadmap.modules || [];


        let exisitingRoadmap = await Roadmap.findOne({ title: roadmap.title }).session(usingTransaction ? session : null);
        if (exisitingRoadmap) {
            if (usingTransaction) { await session.abortTransaction(); session.endSession(); }
            throw new Error("Roadmap already exists");
        }

        const roadmapSlug = roadmap.slug;
        const roadmapTitle = roadmap.title;
        const roadmapDescription = roadmap.description;
        const roadmapDomain = roadmap.domain;
        const roadmapLevel = roadmap.level;

        // create roadmap
        const roadmapResults = await Roadmap.create([{
            slug: roadmapSlug,
            title: roadmapTitle,
            description: roadmapDescription,
            domain: roadmapDomain,
            level: roadmapLevel,
            modules: []
        }], opts);
        if (!Array.isArray(roadmapResults) || roadmapResults.length === 0) {
            throw new Error('Roadmap.create returned no documents');
        }
        const newRoadmap = roadmapResults[0];

        const createdModuleIds = [];

        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];

            const moduleSlug = module.slug;
            const moduleTitle = module.title;
            const moduleDescription = module.description;
            const moduleIndex = Number(module.index ?? i);

            const modResults = await Module.create([{
                roadmap: newRoadmap._id,
                slug: moduleSlug,
                title: moduleTitle,
                description: moduleDescription,
                index: moduleIndex,
                topics: []
            }], opts);
            if (!Array.isArray(modResults) || modResults.length === 0) {
                throw new Error(`Module.create failed for module at index ${i} (slug=${moduleSlug})`);
            }
            const createdModule = modResults[0];


            createdModuleIds.push(createdModule._id);

            const createdTopicIds = [];

            const topicsArr = module.topics || [];
            for (let j = 0; j < topicsArr.length; j++) {
                const topicManifest = topicsArr[j];

                const topicSlug = topicManifest.slug;
                const topicTitle = topicManifest.title;
                const topicIndex = Number(topicManifest.index ?? j);
                const topicLanguageUsed = topicManifest.languageUsed ?? null;
                const topicExample = topicManifest.example ?? "";
                const topicContent = topicManifest.content ?? "";

                const topicResults = await Topic.create([{
                    slug: topicSlug,
                    title: topicTitle,
                    description: topicManifest.description ?? moduleDescription ?? "",
                    index: topicIndex,
                    languageUsed: topicLanguageUsed,
                    example: topicExample,
                    content: topicContent,
                    module: createdModule._id,
                    testCases: []
                }], opts);
                if (!Array.isArray(topicResults) || topicResults.length === 0) {
                    throw new Error(`Topic.create failed for moduleIndex=${i}, topicIndex=${j} (slug=${topicSlug})`);
                }
                const createdTopic = topicResults[0];


                createdTopicIds.push(createdTopic._id);

                const testCasesArray = topicManifest.testCases || [];
                const createdTestCaseIds = [];

                for (let k = 0; k < testCasesArray.length; k++) {
                    const tc = testCasesArray[k];

                    const testCasesInput = tc.input ?? "";
                    const testCasesOutput = tc.output ?? "";
                    const testCasesExplanation = tc.explanation ?? "";
                    const testCasesVisible = (typeof tc.visible === "boolean") ? tc.visible : true;

                    const tcResults = await TestCase.create([{
                        topic: createdTopic._id,
                        input: testCasesInput,
                        output: testCasesOutput,
                        explanation: testCasesExplanation,
                        visible: testCasesVisible
                    }], opts);
                    if (!Array.isArray(tcResults) || tcResults.length === 0) {
                        throw new Error(`TestCase.create failed for moduleIndex=${i}, topicIndex=${j}, tcIndex=${k}`);
                    }
                    const createdTestCase = tcResults[0];
                    createdTestCaseIds.push(createdTestCase._id);

                }

                if (createdTestCaseIds.length > 0) {
                    const upd = await Topic.updateOne(
                        { _id: createdTopic._id },
                        { $set: { testCases: createdTestCaseIds } },
                        opts
                    );

                }
            } // end topics loop

            if (createdTopicIds.length > 0) {
                const updMod = await Module.updateOne(
                    { _id: createdModule._id },
                    { $set: { topics: createdTopicIds } },
                    opts
                );

            }
        } // end modules loop

        if (createdModuleIds.length > 0) {
            const updRoad = await Roadmap.updateOne(
                { _id: newRoadmap._id },
                { $set: { modules: createdModuleIds } },
                opts
            );

        }

        if (usingTransaction) {
            await session.commitTransaction();
            session.endSession();
        }

        return newRoadmap;
    } catch (error) {
        try { if (usingTransaction) await session.abortTransaction(); } catch (e) { }
        if (usingTransaction) session.endSession();
        console.error("parseRoadmap error:", error && error.message ? error.message : error);
        throw error;
    }
}


export async function newRoadmap() {

    return parseRoadmap();
}
