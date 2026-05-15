import { findUniversityByQuery, formatUniversityVaccineGuidance, hasSchoolVaccineIntent } from '../data/universities';
import {
  CURRENT_SYMPTOM_GUIDANCE,
  formatGenericCollegeVaccineGuidance,
  formatTravelHealthSymptomGuidance,
  formatTravelVaccineGuidance,
  getTravelCountry,
  getVaccineExpectationGuidance,
  hasCollegeVaccineRequirementIntent,
  hasFutureVaccineExpectationIntent,
  hasCurrentSymptomIntent,
  hasTravelHealthSymptomIntent,
  hasTravelVaccineIntent,
} from '../data/vaccineGuidance';

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

  if (hasTravelHealthSymptomIntent(message)) {
    const country = getTravelCountry(message);
    return country
      ? formatTravelHealthSymptomGuidance(country)
      : 'Which destination are you asking about?';
  }

  if (hasFutureVaccineExpectationIntent(message)) {
    return getVaccineExpectationGuidance(message);
  }

  if (hasTravelVaccineIntent(message)) {
    const country = getTravelCountry(message);
    return country
      ? formatTravelVaccineGuidance(country)
      : 'Which country are you asking about?';
  }

  if (matchedSchool && (hasCollegeVaccineRequirementIntent(message) || hasSchoolVaccineIntent(message))) {
    return formatUniversityVaccineGuidance(matchedSchool);
  }

  if (hasCollegeVaccineRequirementIntent(message) || hasSchoolVaccineIntent(message)) {
    return formatGenericCollegeVaccineGuidance();
  }

  if (hasCurrentSymptomIntent(message) || normalized.includes('symptom') || normalized.includes('fever') || normalized.includes('headache') || normalized.includes('sore')) {
    return CURRENT_SYMPTOM_GUIDANCE;
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
