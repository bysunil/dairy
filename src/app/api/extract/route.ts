import { GoogleGenAI, Type, Schema } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

const receiptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    center_name: { type: Type.STRING },
    date: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
    shift: { type: Type.STRING, description: "AM or PM" },
    purchase_time: { type: Type.STRING, description: "Format: HH:MM:SS" },
    producer_name: { type: Type.STRING },
    producer_number: { type: Type.INTEGER },
    fat: { type: Type.NUMBER },
    snf: { type: Type.NUMBER },
    quantity: { type: Type.NUMBER },
    water_percent: { type: Type.NUMBER },
    rate: { type: Type.NUMBER },
    total_amount: { type: Type.NUMBER },
  },
  required: [
    "center_name", "date", "shift", "purchase_time",
    "producer_name", "producer_number", "fat", "snf",
    "quantity", "water_percent", "rate", "total_amount"
  ]
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to base64 for Gemini API
    const bytes = await image.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString('base64');

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API Key is not configured.' }, { status: 500 });
    }

    let response;
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { inlineData: { data: base64Data, mimeType: image.type } },
                { text: "Extract the details from this milk receipt based on the provided schema." }
              ]
            }
          ],
          config: {
            responseMimeType: "application/json",
            responseSchema: receiptSchema,
          }
        });
        break; // Success, exit loop
      } catch (err: any) {
        if (err.status === 503 && retries > 1) {
          retries--;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw err;
        }
      }
    }

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    const extractedData = JSON.parse(resultText);

    return NextResponse.json({ success: true, data: extractedData });
  } catch (error: any) {
    console.error("Extraction error:", error);
    return NextResponse.json({ error: error.message || 'Failed to extract data' }, { status: 500 });
  }
}
