import { readFileSync } from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function showHTML(filename, params = {}) {
    const file = readFileSync(
        path.join(__dirname, '../public', filename),
        'utf-8'
    );
    let result = file;

    for (const [param, value] of Object.entries(params)) {
        if (typeof value === 'object') {
            result = result.replaceAll(`$${param}$`, JSON.stringify(value, null, 3));

            continue
        }

        result = result.replaceAll(`$${param}$`, value);
    }


    return result
}