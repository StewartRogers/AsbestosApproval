import { NextResponse } from 'next/server';
import { getApplications } from '@/lib/storage';

export async function GET() {
    const applications = await getApplications();
    return NextResponse.json(applications);
}
