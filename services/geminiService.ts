import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SparkResponse } from "../types";

const apiKey = process.env.API_KEY;

// Define the response schema for strict JSON output
const conceptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The name of the philosophical concept or paradox.",
    },
    philosopherOrSchool: {
      type: Type.STRING,
      description: "The associated philosopher or school of thought.",
    },
    coreIdea: {
      type: Type.STRING,
      description: "A concise definition of the concept.",
    },
    applicationToLife: {
      type: Type.STRING,
      description: "A direct explanation of how this concept relates to the user's specific post/situation.",
    },
    sepTerm: {
      type: Type.STRING,
      description: "A search term likely to work on the Stanford Encyclopedia of Philosophy (SEP).",
    },
    iepTerm: {
      type: Type.STRING,
      description: "A search term likely to work on the Internet Encyclopedia of Philosophy (IEP).",
    },
    crashCourseTopic: {
      type: Type.STRING,
      description: "A broad topic keyword suitable for searching Crash Course Philosophy.",
    },
  },
  required: ["name", "philosopherOrSchool", "coreIdea", "applicationToLife", "sepTerm", "iepTerm", "crashCourseTopic"],
};

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: conceptSchema,
};

export const generateSparks = async (userPost: string): Promise<SparkResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Analyze the following user statement (which represents a social media post about their life or thoughts) and generate 3 distinct, profound philosophical insights that relate directly to it.
              
              User Statement: "${userPost}"
              
              For each insight:
              1. Identify a relevant philosophical concept or school of thought.
              2. Explain the core idea simply.
              3. "Spark" a connection: Explain specifically why this philosophy matters to the user's situation.
              4. Provide search terms for the canonical resources: SEP, IEP, and Crash Course.
              `
            }
          ],
        },
      ],
      config: {
        systemInstruction: "You are Philosophy Spark, a digital philosopher. Your goal is to bridge the gap between everyday experiences and deep philosophical wisdom. Be insightful, empathetic, and intellectually stimulating without being overly academic or dry. Focus on practical application of wisdom.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // A balance of creativity and accuracy
      },
    });

    const text = response.text;
    if (!text) {
      return [];
    }

    return JSON.parse(text) as SparkResponse;
  } catch (error) {
    console.error("Error generating sparks:", error);
    throw error;
  }
};