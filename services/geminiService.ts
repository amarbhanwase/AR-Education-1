// Fix: Imported GoogleGenAI and Type from the '@google/genai' package as per coding guidelines.
import { GoogleGenAI, Type } from "@google/genai";
import { PerformanceData } from '../types.ts';

// Fix: Initialized the GoogleGenAI client directly using the API key from environment variables,
// removing the conditional check to align with the assumption that the key is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyRecommendation = async (performanceData: PerformanceData[], studentName: string): Promise<string> => {
  // Fix: Removed the null check for the 'ai' instance, as it's now guaranteed to be initialized.
  const performanceSummary = performanceData
    .map(p => `- ${p.topic}: ${p.correct} out of ${p.total} correct (${Math.round((p.correct / p.total) * 100)}%)`)
    .join('\n');

  const prompt = `
    A student named ${studentName} just completed a biology quiz. Here is their performance breakdown by topic:
    ${performanceSummary}

    Based on these results, analyze their strengths and weaknesses. 
    Then, recommend ONE specific topic they should focus on next to improve the most.
    Provide a brief, encouraging explanation for why this topic is important and suggest a simple study strategy.
    
    Format your response as a JSON object with the following structure:
    {
      "recommendedTopic": "The topic to study next",
      "reasoning": "A concise and encouraging explanation.",
      "studyStrategy": "A simple, actionable study tip."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedTopic: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            studyStrategy: { type: Type.STRING },
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    return `
      <h4 class="font-bold text-lg text-green-700 mb-2">Next Steps for ${studentName}: Focus on ${parsedResponse.recommendedTopic}</h4>
      <p class="mb-2">${parsedResponse.reasoning}</p>
      <p><strong>Suggested Strategy:</strong> ${parsedResponse.studyStrategy}</p>
    `;

  } catch (error) {
    console.error("Error fetching study recommendation:", error);
    return "Could not generate an AI recommendation at this time. Focus on the topics where you scored the lowest.";
  }
};