import { findUniversityByQuery, formatUniversityVaccineGuidance, hasSchoolVaccineIntent } from '../data/universities';

const fallbackResponses = [
  `I can help with that. This demo is built around the moments where people usually need a little direction: finding the right page, understanding V-safe, or checking vaccine requirement resources for school.

Try asking:
- "Take me to sign up"
- "What is V-safe?"
- "What vaccines do college students need?"
- "Show me privacy information"

I will keep the steps clear and ask before opening a different page.`,
  `If you are asking because you do not feel well after a vaccine, I can help you think through the next step.

V-safe is for short check-ins after vaccination, so it is a good place to report how you are feeling. If symptoms sound serious, I can also point you to emergency guidance.

For severe symptoms like difficulty breathing, chest pain, face or throat swelling, or a very high fever, seek emergency care immediately.`,
  `I am here to help you move through the demo without guessing where things are.

You can ask about check-ins, V-safe basics, privacy, emergency guidance, or a university's vaccine requirement page. If a request would move you to another page, I will ask for permission first.`,
];

function chooseDemoResponse(message: string) {
  const normalized = message.toLowerCase();
  const matchedSchool = findUniversityByQuery(message);

  if (matchedSchool) {
    return formatUniversityVaccineGuidance(matchedSchool);
  }

  if (hasSchoolVaccineIntent(message)) {
    return `I understand this is about school vaccine requirements, but I could not match a specific university in the demo database.

Send the school name directly, such as "SCAD", "UCLA", "MIT", or "University of Michigan", and I will look for the official immunization page first.`;
  }

  if (normalized.includes('symptom') || normalized.includes('fever') || normalized.includes('headache') || normalized.includes('sore')) {
    return `I am sorry you are dealing with symptoms. I can help you decide what to do in the demo and when to look for urgent help.

Mild symptoms like a sore arm, headache, fatigue, chills, or a low fever can happen after vaccination and often improve within 1-2 days.

You can use the check-in page to report how you feel. If symptoms are severe, unusual, or do not go away, contact a healthcare professional. For difficulty breathing, chest pain, or face/throat swelling, call 911 immediately.`;
  }

  if (normalized.includes('privacy') || normalized.includes('data') || normalized.includes('security')) {
    return `That is a reasonable thing to check before sharing health information.

V-safe uses health check-in information to support vaccine safety monitoring. In this student demo, no real government database is connected and no real medical record is being submitted.

For the prototype, you can review the privacy page to see how the app explains data collection, use, and participant protections.`;
  }

  const index = Math.abs([...message].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % fallbackResponses.length;
  return fallbackResponses[index];
}

export async function getHealthAssistantResponse(userMessage: string, _chatHistory: { role: 'user' | 'assistant', content: string }[]) {
  await new Promise(resolve => setTimeout(resolve, 450));
  return chooseDemoResponse(userMessage);
}
