import path from 'path';
import { fileURLToPath } from 'url';

function getPath2File(file){
    
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootDir = path.resolve(__dirname, '..');

export default {
    __dirname,
    __rootDir
}