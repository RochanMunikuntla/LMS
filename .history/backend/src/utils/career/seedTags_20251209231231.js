import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import Tag from '../../api/career/models/tag.js';

export async function seedTags() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'tags.json');

        const file = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(file);

        for(let i = 0;i<json.tags.length;i++){
            let name = json.tags[i].name;
            let category = json.tags[i].category;

            await Tag.create({
                
            })
        }

        console.log(json.tags[69].name)
    } catch (error) {
        console.log(error);
    }
}

seedTags();
