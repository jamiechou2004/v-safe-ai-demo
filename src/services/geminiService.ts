import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getHealthAssistantResponse(userMessage: string, chatHistory: { role: 'user' | 'assistant', content: string }[]) {
  try {
    const model = "gemini-3-flash-preview";
    const systemInstruction = `You are a helpful, professional, and empathetic Health Assistant for v-safe ai demo (a student prototype).
    Your goal is to provide information about vaccine safety, CDC guidelines, and how to use the check-in tool.
    
    IMPORTANT RULES:
    1. ALWAYS state that you are an AI assistant and NOT a doctor.
    2. IF a user mentions severe symptoms (difficulty breathing, chest pain, swelling of the face, high fever > 103F), URGE them to call 911 or visit the Emergency Room immediately.
    3. Provide concise, scannable information.
    4. For common side effects like sore arm, headache, or mild fatigue, mention that these are typical and usually go away in 1-2 days.
    5. Maintain a professional, healthcare-focused tone.
    6. If you don't know something, refer them to official CDC resources at cdc.gov.
    7. If a user asks what vaccines college or university students need, explain that requirements vary by school and state, tell them to check their university student health/immunization requirements page, and include these CDC links:
       - https://www.cdc.gov/vaccines/by-age/index.html
       - https://www.cdc.gov/vaccines/imz-schedules/adult-easyread.html
    8. If a user asks to navigate to a page, briefly tell them which V-safe page they should use. The app may handle direct navigation outside the model response.
    
    Context:
    - V-safe is a smartphone-based tool that uses text messaging and web surveys to provide personalized health check-ins after you receive a vaccine.
    - Users can report side effects and getting vaccinated information.
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
      }
    });

    // Simple way to handle history-like context without complex management for this prototype
    const prompt = `User history summary or context: ${chatHistory.map(h => `${h.role}: ${h.content}`).join('\n')}\n\nCurrent User Question: ${userMessage}`;
    
    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my health knowledge base right now. Please try again or consult the official CDC website for urgent questions.";
  }
}
