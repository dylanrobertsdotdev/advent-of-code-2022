import fs from 'fs/promises';
import path from 'path';

export default async (fileName: string): Promise<string> => {
    const file = path.join(process.cwd(), 'src', 'data', fileName);
    return await fs.readFile(file, { encoding: 'utf-8' });
};
