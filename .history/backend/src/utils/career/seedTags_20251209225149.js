import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import 

export async function seedTags() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'tags.json');

        const file = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(file);


        console.log(json.tags[161]);
    } catch (error) {
        console.log(error);
    }
}

seedTags();