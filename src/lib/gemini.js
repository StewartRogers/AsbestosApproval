import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeApplication(application) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    You are an expert Asbestos Licensing Officer. Review the following application for an Asbestos Removal License.
    
    Criteria for Auto-Approval:
    1. Company Name must be provided.
    2. Safety History must show at least 5 years of experience without major violations.
    3. Description must be detailed and professional.

    If the application meets these criteria, status is "APPROVED".
    If there are any doubts, vague descriptions, or safety concerns, status is "REFER_TO_ADMIN".

    Application Details:
    Company: ${application.companyName}
    License Type: ${application.licenseType}
    Safety History: ${application.safetyHistory}

    Respond with a JSON object ONLY:
    {
      "status": "APPROVED" | "REFER_TO_ADMIN",
      "reason": "Brief explanation of the decision"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Gemini analysis failed:', error);
        return {
            status: 'REFER_TO_ADMIN',
            reason: 'AI Analysis failed, manual review required.'
        };
    }
}
