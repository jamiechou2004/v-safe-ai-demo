const fallbackResponses = [
  `I am an AI assistant, not a doctor.

For this demo, I can help you find the right V-safe page, explain what V-safe does, and point students to general vaccine requirement resources.

Try asking:
- "Take me to sign up"
- "What is V-safe?"
- "What vaccines do college students need?"
- "Show me privacy information"`,
  `I am an AI assistant, not a doctor.

V-safe helps people complete short vaccine safety check-ins after vaccination. If your question is about symptoms, I can help you decide whether to report them or review emergency guidance.

For severe symptoms like difficulty breathing, chest pain, face or throat swelling, or very high fever, seek emergency care immediately.`,
  `I am an AI assistant, not a doctor.

This demo is focused on vaccine check-ins, V-safe information, privacy, emergency guidance, and college vaccine requirement resources. Ask me where you want to go, and I can route you there.`,
];

function chooseDemoResponse(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('symptom') || normalized.includes('fever') || normalized.includes('headache') || normalized.includes('sore')) {
    return `I am an AI assistant, not a doctor.

Mild symptoms like a sore arm, headache, fatigue, chills, or a low fever can happen after vaccination and often improve within 1-2 days.

You can use the check-in page to report how you feel. If symptoms are severe, unusual, or do not go away, contact a healthcare professional. For difficulty breathing, chest pain, or face/throat swelling, call 911 immediately.`;
  }

  if (normalized.includes('privacy') || normalized.includes('data') || normalized.includes('security')) {
    return `I am an AI assistant, not a doctor.

V-safe uses health check-in information to support vaccine safety monitoring. In this student demo, no real government database is connected.

For the prototype, you can review the privacy page to see how the app explains data collection, use, and participant protections.`;
  }

  const index = Math.abs([...message].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % fallbackResponses.length;
  return fallbackResponses[index];
}

export async function getHealthAssistantResponse(userMessage: string, _chatHistory: { role: 'user' | 'assistant', content: string }[]) {
  await new Promise(resolve => setTimeout(resolve, 450));
  return chooseDemoResponse(userMessage);
}
