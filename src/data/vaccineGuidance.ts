export function hasFutureVaccineExpectationIntent(message: string) {
  const normalized = message.toLowerCase();
  const futureTerms = ['tomorrow', 'next week', 'getting', 'going to get', 'will get', 'about to get', 'expect', 'expected', 'after i get', 'what symptoms can i expect', 'side effects can i expect', '接下来', '明天', '准备打', '会有什么'];
  const vaccineTerms = ['vaccine', 'vaccination', 'shot', 'jab', 'dose', '疫苗', '接种'];

  return futureTerms.some(term => normalized.includes(term)) && vaccineTerms.some(term => normalized.includes(term));
}

export function hasCurrentSymptomIntent(message: string) {
  const normalized = message.toLowerCase();
  const currentTerms = ['i have', 'i am having', "i'm having", 'experiencing', 'feel sick', 'feeling sick', 'after my vaccine', 'after getting', 'got my', 'yesterday', 'today', '现在', '已经', '感觉'];
  const symptomTerms = ['symptom', 'fever', 'headache', 'sore', 'pain', 'chills', 'swelling', 'hives', 'dizzy', 'nausea', '症状', '发烧', '头痛', '疼', '肿'];

  return currentTerms.some(term => normalized.includes(term)) && symptomTerms.some(term => normalized.includes(term));
}

export function isShinglesVaccineQuestion(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes('shingles') || normalized.includes('shingrix') || normalized.includes('zoster') || normalized.includes('带状疱疹');
}

export function getVaccineExpectationGuidance(message: string) {
  return isShinglesVaccineQuestion(message) ? SHINGLES_EXPECTATION_GUIDANCE : GENERAL_EXPECTATION_GUIDANCE;
}

export const SHINGLES_EXPECTATION_GUIDANCE = `## What you can expect after the shingles vaccine

> Here is what you can generally expect after getting the shingles vaccine, and how V-safe can help you track how you feel afterward.

### Common symptoms
- **Where you got the shot:** pain, redness, or swelling.
- **Whole-body symptoms:** tiredness, muscle pain, headache, chills, fever, upset stomach, or nausea.
- **Why it happens:** mild short-term side effects can be a normal sign that your body is building protection.

### How long symptoms may last
- CDC notes that shingles vaccine side effects are usually mild to moderate and often improve within **2-3 days**.
- Some people may feel tired enough that normal activities are affected for a short time.

### What you can do
- Rest and drink fluids.
- Use a cool compress for arm soreness.
- Ask your pharmacist or healthcare provider whether acetaminophen or ibuprofen is safe for you to take.
- Ask when you should return for dose 2 of Shingrix.

### Use V-safe to check in
- After vaccination, you can use V-safe to check in and report how you feel: [V-safe](https://vsafe.cdc.gov/)
- In this demo, I can also open **Sign up / Register** so you can practice the check-in flow.

### When to get medical help
- Contact a healthcare professional if symptoms are severe, unusual, or do not improve.
- **Call 911 right away** for difficulty breathing, face or throat swelling, chest pain, severe allergic reaction, dizziness/weakness, or hives.

### Official sources
- [V-safe](https://vsafe.cdc.gov/)
- [CDC: Shingles vaccine safety](https://www.cdc.gov/vaccine-safety/vaccines/shingles-herpes.html)
- [CDC: Shingles vaccination](https://www.cdc.gov/shingles/vaccines/index.html)
- [CDC: What you can expect after Shingrix](https://www.cdc.gov/shingles/communication-resources/shingles-vaccine-fact-sheet.html)`;

export const GENERAL_EXPECTATION_GUIDANCE = `## What you can expect after vaccination

> Here is what you can generally expect after a vaccine, and how V-safe can help you track symptoms afterward.

### Common symptoms
- **At the injection site:** soreness, redness, or swelling.
- **General symptoms:** tiredness, headache, chills, mild fever, or muscle aches.
- **Why it happens:** mild short-term side effects can be normal after vaccination.

### How long symptoms may last
- Many mild reactions improve within a few days.
- The exact pattern depends on the vaccine and your health history.

### What you can do
- Rest and drink fluids.
- Use a cool compress for arm soreness.
- Ask a pharmacist or healthcare provider whether an over-the-counter pain reliever is safe for you.

### Use V-safe to check in
- After vaccination, you can use V-safe to check in and report how you feel: [V-safe](https://vsafe.cdc.gov/)
- In this demo, I can open **Sign up / Register** so you can practice the check-in flow.

### When to get medical help
- Contact a healthcare professional if symptoms are severe, unusual, or do not improve.
- **Call 911 right away** for difficulty breathing, face or throat swelling, chest pain, severe allergic reaction, dizziness/weakness, or hives.

### Official sources
- [V-safe](https://vsafe.cdc.gov/)
- [CDC: Possible side effects from vaccines](https://www.cdc.gov/vaccines/basics/possible-side-effects.html)`;

export const CURRENT_SYMPTOM_GUIDANCE = `## What to do if you feel symptoms after vaccination

> If you already received a vaccine and are feeling symptoms, the next step is to decide whether they sound expected, need routine follow-up, or need urgent help.

### Common short-term symptoms
- Sore arm, redness, or swelling where you got the shot.
- Tiredness, headache, chills, mild fever, or muscle aches.

### What you can do
- Rest and drink fluids.
- Track when symptoms started and whether they are improving.
- Use V-safe to check in and report how you feel: [V-safe](https://vsafe.cdc.gov/)

### When to get medical help
- Contact a healthcare professional if symptoms are severe, unusual, worsening, or do not improve.
- **Call 911 right away** for difficulty breathing, face or throat swelling, chest pain, severe allergic reaction, dizziness/weakness, or hives.`;

const knownTravelCountries: Record<string, { name: string; slug: string; notes?: string[] }> = {
  brazil: {
    name: 'Brazil',
    slug: 'brazil',
    notes: [
      'CDC Travelers Health highlights yellow fever considerations for many areas of Brazil; recommendations depend on itinerary and risk area.',
      'CDC also lists travel-related vaccines such as typhoid for some travelers depending on food, lodging, and activities.',
    ],
  },
};

export function getTravelCountry(message: string) {
  const normalized = message.toLowerCase();
  const travelMatch = normalized.match(/travel(?:ing|ling)? to ([a-zA-Z\s-]+)/) || normalized.match(/going to ([a-zA-Z\s-]+)/);
  const rawCountry = travelMatch?.[1]?.replace(/[?.!,].*$/, '').trim();
  const known = Object.values(knownTravelCountries).find(country => normalized.includes(country.name.toLowerCase()) || rawCountry === country.name.toLowerCase());

  if (known) return known;
  if (!rawCountry) return null;

  const cleaned = rawCountry
    .replace(/\bwhat vaccines.*$/, '')
    .replace(/\bfor travel.*$/, '')
    .trim();

  return cleaned ? { name: cleaned.replace(/\b\w/g, char => char.toUpperCase()), slug: '' } : null;
}

export function hasTravelVaccineIntent(message: string) {
  const normalized = message.toLowerCase();
  const travelTerms = ['travel', 'traveling', 'travelling', 'trip', 'going to', 'visit', 'visiting', '旅行', '去'];
  const vaccineTerms = ['vaccine', 'vaccines', 'vaccination', 'required', 'requirements', 'entry', 'yellow fever', '疫苗', '入境'];

  return travelTerms.some(term => normalized.includes(term)) && vaccineTerms.some(term => normalized.includes(term));
}

export function formatTravelVaccineGuidance(country: { name: string; slug?: string; notes?: string[] }) {
  const countryLink = country.slug
    ? `https://wwwnc.cdc.gov/travel/destinations/traveler/none/${country.slug}`
    : 'https://wwwnc.cdc.gov/travel/destinations/list';
  const notes = country.notes?.length
    ? `\n${country.notes.map(note => `- ${note}`).join('\n')}`
    : '\n- I do not have verified country-specific vaccine details stored for this destination in the demo.';

  return `## Vaccines for travel to ${country.name}

> For travel to ${country.name}, vaccine guidance may include both vaccines required for entry and vaccines recommended for your protection. The best source is CDC Travelers Health because requirements and outbreaks can change.

### Required vaccines for entry
- Entry requirements depend on your itinerary, where you are arriving from, transit countries, and current destination rules.
- I cannot guarantee legal entry requirements here. Confirm with CDC Travelers Health, the destination country, your airline, or a travel clinic.

### Recommended vaccines
${notes}
- A travel clinician can tailor recommendations based on trip length, activities, rural/urban travel, health history, and previous vaccines.

### Routine vaccines to update
- MMR
- Tdap
- Polio
- Influenza
- COVID-19, if recommended for you
- Other routine vaccines based on age and health history

### Official CDC travel link
- [CDC Travelers Health: ${country.name}](${countryLink})
- [CDC destination list](https://wwwnc.cdc.gov/travel/destinations/list)

### What to do before your trip
- Review CDC Travelers Health for your destination.
- See a healthcare provider or travel clinic ideally **4-6 weeks before travel**.
- Bring your itinerary, vaccine records, medications, and health conditions to the visit.`;
}

export function hasCollegeVaccineRequirementIntent(message: string) {
  const normalized = message.toLowerCase();
  const collegeTerms = ['college', 'university', 'school', 'campus', 'attending', 'enrollment', 'enroll', 'student', '大学', '学校', '入学'];
  const vaccineTerms = ['vaccine', 'vaccines', 'immunization', 'immunizations', 'required', 'requirements', 'records', 'health form', '疫苗', '免疫', '要求'];

  return collegeTerms.some(term => normalized.includes(term)) && vaccineTerms.some(term => normalized.includes(term));
}

export function formatGenericCollegeVaccineGuidance(schoolName?: string) {
  const title = schoolName ? `Vaccines for enrollment at ${schoolName}` : 'Vaccines for college enrollment';

  return `## ${title}

> College immunization requirements vary by school, state, program, housing status, and student type. Confirm requirements on the official student health or immunization requirements page before submitting records.

### Common college vaccine requirements
- MMR
- Meningococcal
- Tdap
- Varicella
- Hepatitis B
- COVID-19 or flu, if required by the school

### Documents you may need
- Official immunization record
- Proof of vaccine doses and dates
- Titer or lab results, if accepted by the school
- Medical or religious exemption forms, if applicable

### Official school link
- I could not verify an exact school requirement here. Please check the official ${schoolName ? `${schoolName} ` : ''}Student Health / Immunization Requirements page.

### What to do next
- Search the school's official website for "student health immunization requirements."
- Submit records before the deadline.
- Contact student health services if you are unsure which records count.`;
}
