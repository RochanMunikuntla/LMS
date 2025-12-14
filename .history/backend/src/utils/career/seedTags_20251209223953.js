import fs from 'fs/promises'

export async function seedTags(file) {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'tags.json');

        const file = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(file);

        console.log(json[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error: ", error });
    }
}