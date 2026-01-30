// scripts/seedTags.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Tag from '../../api/career/models/tag.js'; // adjust path if needed

import dotenv from 'dotenv';
dotenv.config();

// -- config --
const MONGO_URI = process.env.MONGO_URI;
const VERBOSE = true;

// helper to print with timestamp
function log(...args) {
    console.log(new Date().toISOString(), ...args);
}

async function seedTags() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'tags.json');

    if (!fs.existsSync(filePath)) {
        throw new Error(`tags.json not found at ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Failed to parse tags.json: ${err.message}`);
    }

    const tagsArray = Array.isArray(json.tags) ? json.tags : (Array.isArray(json) ? json : null);
    if (!Array.isArray(tagsArray)) {
        throw new Error('Invalid JSON structure. Expected { "tags": [ { name, category }, ... ] } or a top-level array.');
    }

    let seeded = 0;
    const skipped = [];

    for (let i = 0; i < tagsArray.length; i++) {
        const t = tagsArray[i];
        const name = (t?.name ?? '').toString().trim();
        const category = (t?.category ?? '').toString().trim();

        if (!name) {
            skipped.push({ index: i, reason: 'Missing or empty name', raw: t });
            if (VERBOSE) log(`SKIP[${i}] - Missing name`);
            continue;
        }

        try {
            // normalize name to lowercase for uniqueness - optional depending on your Tag schema
            const normalized = name.toLowerCase();

            // check duplicate by name (case-insensitive)
            const exists = await Tag.findOne({ name: { $regex: `^${escapeRegExp(name)}$`, $options: 'i' } }).lean();

            if (exists) {
                skipped.push({ index: i, name, reason: 'Duplicate' });
                if (VERBOSE) log(`SKIP[${i}] - Duplicate: ${name}`);
                continue;
            }

            await Tag.create({ name, category });
            seeded++;
            if (VERBOSE) log(`SEEDED[${i}] - ${name} (${category || 'no-category'})`);
        } catch (err) {
            skipped.push({ index: i, name: name || null, reason: err.message });
            console.error(`ERROR[${i}] creating tag "${name}":`, err.message);
        }
    }

    return { seeded, skipped, total: tagsArray.length };
}

// escape regex helper
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
    try {
        log('Connecting to MongoDB:', MONGO_URI);
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URI);

        log('Connected. Starting tag seed...');
        const result = await seedTags();

        log('--- SEED SUMMARY ---');
        log('Total tags in file:', result.total);
        log('Seeded:', result.seeded);
        log('Skipped:', result.skipped.length);

        if (result.skipped.length > 0) {
            log('Skipped details:');
            result.skipped.forEach((s, idx) => {
                log(`${idx + 1}. index=${s.index} name=${s.name ?? 'N/A'} reason=${s.reason}`);
            });
        }

        await mongoose.disconnect();
        log('Disconnected. Done.');
        process.exit(0);
    } catch (err) {
        console.error('Seed script failed:', err);
        try { await mongoose.disconnect(); } catch (e) { }
        process.exit(1);
    }
}

// Run when invoked directly
if (process.argv[1] && process.argv[1].endsWith('seedTags.js')) {
    main();
}

export default seedTags;
