import { NextResponse } from 'next/server';
import { saveApplication } from '@/lib/storage';
import { analyzeApplication } from '@/lib/gemini';

export async function POST(request) {
    try {
        const body = await request.json();

        // 1. Analyze with Gemini
        const analysis = await analyzeApplication(body);

        // 2. Prepare application object
        const application = {
            ...body,
            status: analysis.status,
            aiReason: analysis.reason,
        };

        // 3. Save to storage
        const savedApp = await saveApplication(application);

        return NextResponse.json(savedApp);
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
