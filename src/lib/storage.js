import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'applications');

export async function saveApplication(application) {
    const id = Date.now().toString();
    const filename = `${id}.json`;
    const filePath = path.join(DATA_DIR, filename);

    const data = {
        id,
        submittedAt: new Date().toISOString(),
        ...application,
    };

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return data;
}

export async function getApplications() {
    try {
        const files = await fs.readdir(DATA_DIR);
        const applications = await Promise.all(
            files.filter(f => f.endsWith('.json')).map(async (file) => {
                const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
                return JSON.parse(content);
            })
        );
        // Sort by newest first
        return applications.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } catch (error) {
        console.error('Error reading applications:', error);
        return [];
    }
}
