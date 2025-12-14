import fs from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

export async function seedTags(file) {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'pythonRoadmap.json');

        const file = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(file);
    } catch (error) {

    }
}