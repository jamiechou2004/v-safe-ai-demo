export function hasFutureVaccineExpectationIntent(message: string) {
  const normalized = message.toLowerCase();
  const futureTerms = ['tomorrow', 'next week', 'getting', 'going to get', 'will get', 'about to get', 'expect', 'expected', 'after i get', '接下来', '明天', '准备打', '会有什么'];
  const vaccineTerms = ['vaccine', 'vaccination', 'shot', 'jab', 'dose', '疫苗', '接种'];

  return futureTerms.some(term => normalized.includes(term)) && vaccineTerms.some(term => normalized.includes(term));
}

export function isShinglesVaccineQuestion(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes('shingles') || normalized.includes('shingrix') || normalized.includes('zoster') || normalized.includes('带状疱疹');
}

export const SHINGLES_EXPECTATION_GUIDANCE = `## Shingles vaccine (Shingrix): what to expect

> Since you are getting the shingles vaccine soon, the main thing to expect is a temporary immune response. Many people feel side effects for a short time, and they usually improve on their own within a few days.

### Common reactions
- **Where you get the shot:** arm pain, redness, or swelling.
- **Whole-body symptoms:** tiredness, muscle pain, headache, shivering/chills, fever, stomach pain, or nausea.
- **Timing:** CDC notes these side effects usually last **2-3 days** and may temporarily affect normal activities.

### How to plan for tomorrow
- Consider keeping the rest of the day lighter if you can.
- Drink fluids and rest if you feel tired or achy.
- Ask your pharmacist or healthcare provider whether an over-the-counter medicine such as acetaminophen or ibuprofen is appropriate for you after the shot.
- Shingrix is a **2-dose series**, so ask when you should return for dose 2.

### When to get medical help
- **Call 911 immediately** for signs of a severe allergic reaction, such as trouble breathing, swelling of the face or throat, fast heartbeat, dizziness, weakness, or hives.
- Contact a healthcare professional if symptoms feel severe, unusual, or do not improve after a few days.

### Use V-safe after vaccination
- After you receive the vaccine, you can use the V-safe check-in flow to record how you feel and keep a clear timeline.
- I can open **Sign up / Register** for you if you want to start that check-in flow.

### Official sources
- [CDC: Shingles vaccination](https://www.cdc.gov/shingles/vaccines/index.html)
- [CDC: What you can expect after Shingrix](https://www.cdc.gov/shingles/communication-resources/shingles-vaccine-fact-sheet.html)`;

export const GENERAL_EXPECTATION_GUIDANCE = `## What to expect after vaccination

> If you are getting a vaccine soon, it is normal to want a clear picture of what may happen afterward. Most expected reactions are temporary and show that your body is responding.

### Common reactions
- **At the injection site:** soreness, redness, or swelling.
- **General symptoms:** tiredness, headache, chills, mild fever, or muscle aches.
- **Timing:** many mild reactions improve within a few days.

### What you can do next
- Ask the pharmacist or healthcare provider what side effects are most common for the exact vaccine you are receiving.
- Keep a note of when the vaccine was given and how you feel afterward.
- Use the V-safe check-in flow after vaccination if you want to record symptoms in this demo.

### When to get help
- Seek urgent help for trouble breathing, chest pain, swelling of the face or throat, faintness, or symptoms that feel severe or unusual.
- Contact a healthcare professional if symptoms do not improve or you are worried.`;
