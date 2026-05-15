import assert from 'node:assert/strict';
import {
  classifyHealthQuestion,
  formatTravelHealthSymptomGuidance,
  getTravelCountry,
} from '../src/data/vaccineGuidance';

const travelSymptomQuestion = "I'm traveling to Argentina next week, what symptoms can I expect?";
const destination = getTravelCountry(travelSymptomQuestion);

assert.equal(classifyHealthQuestion(travelSymptomQuestion), 'travel_health_symptoms');
assert.equal(destination?.name, 'Argentina');

assert.ok(destination, 'Expected Argentina to be detected as the travel destination.');

const response = formatTravelHealthSymptomGuidance(destination);
const lowerResponse = response.toLowerCase();
const cdcIndex = lowerResponse.indexOf('cdc travelers health');
const vSafeIndex = lowerResponse.indexOf('v-safe');

assert.match(response, /Argentina/);
assert.match(response, /Symptoms after travel vaccines/i);
assert.match(response, /Illness symptoms to watch/i);
assert.match(response, /CDC Travelers Health/i);
assert.match(response, /travel clinic/i);
assert.ok(cdcIndex >= 0, 'Expected CDC Travelers Health to appear in the response.');
assert.ok(vSafeIndex === -1 || vSafeIndex > cdcIndex, 'V-safe should not be the primary CTA for travel-health symptom questions.');

console.log('Assistant intent tests passed.');
