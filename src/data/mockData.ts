import type { Exercise } from '@/types'

// ── Listening Exercises ──────────────────────────────────────────────
export const listeningExercises: Exercise[] = [
  {
    id: 'listen-1',
    type: 'listening',
    title: 'Section 1 – Booking a Hotel Room',
    description: 'A conversation between a guest and a hotel receptionist about room availability.',
    difficulty: 'Beginner',
    duration: 10,
    passage: `Receptionist: Good morning, Lakeside Hotel. How can I help you?
Guest: Hi, I'd like to book a double room for three nights starting the 15th of March.
Receptionist: Let me check availability. Yes, we have a lake-view double at £120 per night, or a garden-view at £95.
Guest: I'll take the garden-view, please. Does it include breakfast?
Receptionist: Breakfast is included, served between 7 and 10 a.m. in the ground-floor restaurant. May I take your name?
Guest: It's Catherine Powell. That's P-O-W-E-L-L.
Receptionist: Thank you, Ms Powell. Could I also take a contact number?
Guest: Sure, it's 07845 312 678.
Receptionist: Perfect. The total comes to £285. We require a £50 deposit to confirm. Would you like to pay by card now?
Guest: Yes, please. Visa ending 4421.
Receptionist: All confirmed. Check-in is from 2 p.m. and checkout by 11 a.m. Is there anything else?
Guest: Could you arrange an airport shuttle? My flight lands at noon.
Receptionist: Of course. We'll have a driver waiting. The shuttle costs £18 each way.
Guest: Just one way, thank you. From the airport.
Receptionist: Noted. Your booking reference is LH-7823. Have a great trip!`,
    questions: [
      { id: 1, type: 'fill-blank', question: 'How many nights does the guest want to stay?', correctAnswer: '3' },
      { id: 2, type: 'multiple-choice', question: 'Which room does the guest choose?', options: ['Lake-view double', 'Garden-view double', 'Standard single', 'Suite'], correctAnswer: 'Garden-view double' },
      { id: 3, type: 'fill-blank', question: 'What is the price per night for the chosen room (in £)?', correctAnswer: '95' },
      { id: 4, type: 'fill-blank', question: "What is the guest's surname? (spell it out)", correctAnswer: 'Powell' },
      { id: 5, type: 'multiple-choice', question: 'How much is the deposit required?', options: ['£30', '£50', '£95', '£120'], correctAnswer: '£50' },
      { id: 6, type: 'fill-blank', question: 'What time is checkout?', correctAnswer: '11 a.m.' },
      { id: 7, type: 'multiple-choice', question: 'How much does the airport shuttle cost one way?', options: ['£12', '£15', '£18', '£20'], correctAnswer: '£18' },
      { id: 8, type: 'fill-blank', question: 'What is the booking reference?', correctAnswer: 'LH-7823' },
    ],
  },
  {
    id: 'listen-2',
    type: 'listening',
    title: 'Section 2 – Library Orientation',
    description: 'A librarian gives new students a tour of the university library facilities.',
    difficulty: 'Beginner',
    duration: 10,
    passage: `Welcome, everyone, to the Central University Library orientation. I'm Sarah, and I'll show you around today.

First, let me explain the opening hours. During term time, we're open Monday to Friday from 8 a.m. to 10 p.m., and on weekends from 10 a.m. to 6 p.m. During holidays, we close at 5 p.m. on weekdays and are closed on Sundays.

The ground floor houses the main reception, self-checkout machines, and our new Digital Hub with 40 computers available on a first-come, first-served basis. Printing costs 5p per black-and-white page and 20p for colour.

The first floor is the quiet study zone — absolutely no talking or phone calls are permitted there. It has 200 individual desks. On the second floor, you'll find the group study rooms. There are 15 rooms, and each can hold up to 6 people. You can book them online through the library portal for up to 3 hours at a time.

Our special collections, including journals dating back to 1850, are on the third floor. Access requires a special pass from the reception desk.

Books can be borrowed for 14 days, with one renewal allowed. Overdue fines are 50p per day. If you need help finding anything, just ask at the Help Desk near the main entrance.`,
    questions: [
      { id: 1, type: 'multiple-choice', question: 'What are the weekday opening hours during term time?', options: ['8 a.m. – 8 p.m.', '8 a.m. – 10 p.m.', '9 a.m. – 10 p.m.', '9 a.m. – 9 p.m.'], correctAnswer: '8 a.m. – 10 p.m.' },
      { id: 2, type: 'fill-blank', question: 'How many computers are in the Digital Hub?', correctAnswer: '40' },
      { id: 3, type: 'fill-blank', question: 'How much does a colour print cost (in pence)?', correctAnswer: '20' },
      { id: 4, type: 'multiple-choice', question: 'Which floor is the quiet study zone on?', options: ['Ground floor', 'First floor', 'Second floor', 'Third floor'], correctAnswer: 'First floor' },
      { id: 5, type: 'fill-blank', question: 'How many group study rooms are there?', correctAnswer: '15' },
      { id: 6, type: 'multiple-choice', question: 'How long can a group study room be booked for?', options: ['1 hour', '2 hours', '3 hours', '4 hours'], correctAnswer: '3 hours' },
      { id: 7, type: 'fill-blank', question: 'How many days can books be borrowed for?', correctAnswer: '14' },
      { id: 8, type: 'fill-blank', question: 'What is the overdue fine per day (in pence)?', correctAnswer: '50' },
    ],
  },
  {
    id: 'listen-3',
    type: 'listening',
    title: 'Section 3 – Research Project Discussion',
    description: 'Two students discuss their marine biology research project with their tutor.',
    difficulty: 'Intermediate',
    duration: 10,
    passage: `Tutor: So, James and Priya, how's the marine biology project going?
James: We've decided to focus on the impact of microplastics on coral reef ecosystems in the Indo-Pacific region.
Priya: We started with a literature review and found 37 relevant studies published between 2018 and 2024.
Tutor: Good. What methodology are you using?
James: We're combining quantitative analysis of existing datasets with qualitative interviews of three marine biologists.
Priya: For the quantitative part, we're using satellite imagery to track reef degradation over a five-year period — 2019 to 2024.
Tutor: That's ambitious. How are you collecting the satellite data?
James: Through the Copernicus Marine Service. They provide free access to ocean-colour data. We've already downloaded imagery for 12 reef sites.
Priya: The challenge is that cloud cover affects about 30% of the images, so we need to apply atmospheric correction algorithms.
Tutor: What about your timeline?
James: We plan to finish data collection by the end of November, complete analysis by mid-January, and submit the final report by March 15th.
Tutor: Any problems so far?
Priya: The main issue is that one of the three biologists we wanted to interview is based in Australia, so we'll need to conduct that interview via video call due to the time difference.
Tutor: That's fine. Just make sure you get informed consent in writing before recording any interviews.`,
    questions: [
      { id: 1, type: 'multiple-choice', question: 'What is the research topic?', options: ['Ocean temperature changes', 'Microplastics and coral reefs', 'Whale migration patterns', 'Deep sea exploration'], correctAnswer: 'Microplastics and coral reefs' },
      { id: 2, type: 'fill-blank', question: 'How many relevant studies did they find?', correctAnswer: '37' },
      { id: 3, type: 'multiple-choice', question: 'What methodology do they use?', options: ['Only quantitative', 'Only qualitative', 'Mixed (quantitative and qualitative)', 'Experimental'], correctAnswer: 'Mixed (quantitative and qualitative)' },
      { id: 4, type: 'fill-blank', question: 'Over how many years are they tracking reef degradation?', correctAnswer: '5' },
      { id: 5, type: 'fill-blank', question: 'How many reef sites have they downloaded imagery for?', correctAnswer: '12' },
      { id: 6, type: 'multiple-choice', question: 'What percentage of images is affected by cloud cover?', options: ['10%', '20%', '30%', '40%'], correctAnswer: '30%' },
      { id: 7, type: 'fill-blank', question: 'When do they plan to finish data collection?', correctAnswer: 'end of November' },
      { id: 8, type: 'multiple-choice', question: 'Why must one interview be via video call?', options: ['Poor internet', 'Time difference (Australia)', 'Budget constraints', 'COVID restrictions'], correctAnswer: 'Time difference (Australia)' },
    ],
  },
  {
    id: 'listen-4',
    type: 'listening',
    title: 'Section 4 – Urban Heat Islands',
    description: 'An academic lecture on how urban heat islands affect cities and possible solutions.',
    difficulty: 'Advanced',
    duration: 10,
    passage: `Today I'll be discussing the Urban Heat Island effect and its implications for city planning.

An Urban Heat Island, or UHI, occurs when a city experiences significantly warmer temperatures than surrounding rural areas. Research shows that urban centres can be 1 to 3 degrees Celsius warmer during the day, and up to 12 degrees warmer at night, compared to nearby countryside.

The primary causes are the replacement of natural vegetation with concrete, asphalt, and steel — materials that absorb and retain heat. Additionally, waste heat from vehicles, factories, and air-conditioning units contributes substantially.

A 2023 study by Professor Chen at MIT analysed 450 cities worldwide and found that the intensity of the UHI effect correlates directly with city population density. Cities with more than 5 million inhabitants showed an average UHI intensity of 4.2 degrees Celsius.

Several mitigation strategies have proven effective. Green roofs — rooftops covered with vegetation — can reduce building surface temperatures by up to 30 degrees. Singapore has mandated that all new buildings over 5,000 square metres must include green features. Cool pavements, which use reflective materials, can lower surface temperatures by 10 to 15 degrees.

Urban tree planting is perhaps the most cost-effective intervention. A single mature tree can provide the cooling equivalent of 10 room-sized air conditioners running for 20 hours. Melbourne's ambitious plan aims to increase tree canopy coverage from 22% to 40% by 2040.

The economic impact is significant — UHIs increase cooling energy consumption by 15 to 20% and are associated with a 5% increase in heat-related hospital admissions during summer months.`,
    questions: [
      { id: 1, type: 'fill-blank', question: 'How many degrees warmer can urban areas be at night compared to rural areas?', correctAnswer: '12' },
      { id: 2, type: 'multiple-choice', question: 'Which professor led the 2023 study?', options: ['Professor Smith', 'Professor Chen', 'Professor Lee', 'Professor Kumar'], correctAnswer: 'Professor Chen' },
      { id: 3, type: 'fill-blank', question: 'How many cities were analysed in the study?', correctAnswer: '450' },
      { id: 4, type: 'fill-blank', question: 'What is the average UHI intensity for cities with over 5 million people (°C)?', correctAnswer: '4.2' },
      { id: 5, type: 'multiple-choice', question: 'By how much can green roofs reduce surface temperature?', options: ['Up to 10°C', 'Up to 20°C', 'Up to 30°C', 'Up to 40°C'], correctAnswer: 'Up to 30°C' },
      { id: 6, type: 'fill-blank', question: 'What is the minimum building size in Singapore requiring green features (sq metres)?', correctAnswer: '5000' },
      { id: 7, type: 'multiple-choice', question: 'What is Melbourne\'s target for tree canopy coverage by 2040?', options: ['30%', '35%', '40%', '45%'], correctAnswer: '40%' },
      { id: 8, type: 'multiple-choice', question: 'By how much do UHIs increase cooling energy consumption?', options: ['5–10%', '10–15%', '15–20%', '20–25%'], correctAnswer: '15–20%' },
    ],
  },
  {
    id: 'listen-5',
    type: 'listening',
    title: 'Full Practice Test (Sections 1–4)',
    description: 'All four sections combined for a complete listening test simulation.',
    difficulty: 'Advanced',
    duration: 30,
    passage: `This is a combined full test. Refer to Sections 1–4 above.

SECTION 1: A traveller calls a tour company to book a wildlife safari.
Tour agent: Thank you for calling Savanna Adventures. The 7-day safari costs $2,450 per person, departing on the 3rd or 17th of each month. Our next available group has 8 spaces remaining. The package includes park entry fees, accommodation in permanent tented camps, all meals, and a certified guide. Airport transfers are $35 each way. You'll need travel insurance and a yellow fever vaccination certificate.

SECTION 2: A museum guide describes an upcoming exhibition.
The exhibition "Ancient Oceans" opens on February 12th and runs until May 30th. It features 230 artefacts from 14 countries. Adult tickets are £16, concessions £12, and under-5s go free. The highlight is a 9-metre-long fossilised ichthyosaur skeleton discovered in 2021 in Rutland, England.

SECTION 3: Students discuss their economics presentation.
Maria: Our presentation on cryptocurrency regulation is due next Thursday. I'll cover the EU's MiCA framework, and Tom will handle the US SEC approach.
Tom: I've found that 23 countries have introduced crypto-specific legislation since 2020. The challenge is that regulations vary enormously — from complete bans in China to very permissive regimes in El Salvador.

SECTION 4: Lecture on sleep science.
Recent studies have revealed that the average adult needs between 7 and 9 hours of sleep. However, a 2024 survey of 15,000 adults found that 38% regularly sleep less than 6 hours. The consequences include a 48% increase in cardiovascular disease risk and a 33% decline in cognitive performance.`,
    questions: [
      { id: 1, type: 'fill-blank', question: '(Section 1) How much does the safari cost per person?', correctAnswer: '2450' },
      { id: 2, type: 'fill-blank', question: '(Section 1) How many spaces remain in the next group?', correctAnswer: '8' },
      { id: 3, type: 'multiple-choice', question: '(Section 2) When does the exhibition open?', options: ['January 12', 'February 12', 'March 12', 'April 12'], correctAnswer: 'February 12' },
      { id: 4, type: 'fill-blank', question: '(Section 2) How many artefacts are in the exhibition?', correctAnswer: '230' },
      { id: 5, type: 'fill-blank', question: '(Section 2) How long is the fossilised ichthyosaur skeleton (metres)?', correctAnswer: '9' },
      { id: 6, type: 'multiple-choice', question: '(Section 3) How many countries have crypto-specific legislation since 2020?', options: ['15', '19', '23', '27'], correctAnswer: '23' },
      { id: 7, type: 'fill-blank', question: '(Section 4) How many adults were surveyed in the 2024 study?', correctAnswer: '15000' },
      { id: 8, type: 'multiple-choice', question: '(Section 4) What % increase in cardiovascular disease risk from poor sleep?', options: ['33%', '38%', '42%', '48%'], correctAnswer: '48%' },
    ],
  },
]

// ── Reading Exercises ────────────────────────────────────────────────
export const readingExercises: Exercise[] = [
  {
    id: 'read-1',
    type: 'reading',
    title: 'Passage 1 – The Rise of Vertical Farming',
    description: 'An article exploring indoor agriculture and its potential to feed growing cities.',
    difficulty: 'Beginner',
    duration: 20,
    passage: `Vertical farming — the practice of growing crops in stacked layers inside controlled-environment buildings — has transformed from a futuristic concept into a rapidly expanding industry. In 2023, the global vertical farming market was valued at $5.2 billion and is projected to reach $17.9 billion by 2030.

Unlike traditional agriculture, vertical farms use hydroponic or aeroponic systems instead of soil. Plants receive precisely calibrated LED lighting, with wavelengths optimised for photosynthesis. Water consumption is reduced by up to 95% compared to field farming because systems continuously recycle unused water.

The Netherlands leads the world in vertical farming innovation. Dutch company PlantLab operates a 900-square-metre facility in Den Bosch that produces lettuce yields 30 times greater per square metre than conventional greenhouses. Japan follows closely, with over 200 vertical farms supplying supermarkets nationwide.

However, critics point to significant challenges. Energy costs remain the primary obstacle — artificial lighting accounts for roughly 40% of operating expenses. A typical vertical farm uses 38.8 kilowatt-hours of electricity per kilogram of lettuce produced, compared to just 1.1 kWh for a conventional greenhouse.

Despite these hurdles, proponents argue that the benefits are compelling. Vertical farms can operate year-round, produce food within cities (reducing transport emissions by up to 90%), and eliminate the need for pesticides entirely. As renewable energy becomes cheaper, the economic equation is expected to shift decisively in favour of indoor farming by the mid-2030s.`,
    questions: [
      { id: 1, type: 'true-false-notgiven', question: 'The vertical farming market is expected to exceed $15 billion by 2030.', correctAnswer: 'True' },
      { id: 2, type: 'true-false-notgiven', question: 'Vertical farms use soil enriched with nutrients.', correctAnswer: 'False' },
      { id: 3, type: 'fill-blank', question: 'Water consumption is reduced by up to ___% compared to field farming.', correctAnswer: '95' },
      { id: 4, type: 'multiple-choice', question: 'Which country leads vertical farming innovation?', options: ['Japan', 'USA', 'Netherlands', 'Singapore'], correctAnswer: 'Netherlands' },
      { id: 5, type: 'fill-blank', question: 'PlantLab produces lettuce yields ___ times greater per square metre.', correctAnswer: '30' },
      { id: 6, type: 'true-false-notgiven', question: 'Japan has over 200 vertical farms.', correctAnswer: 'True' },
      { id: 7, type: 'multiple-choice', question: 'What percentage of operating costs does lighting account for?', options: ['20%', '30%', '40%', '50%'], correctAnswer: '40%' },
      { id: 8, type: 'true-false-notgiven', question: 'Vertical farms still require small amounts of pesticide.', correctAnswer: 'False' },
    ],
  },
  {
    id: 'read-2',
    type: 'reading',
    title: 'Passage 2 – The Psychology of Colour in Marketing',
    description: 'How businesses use colour psychology to influence buying decisions.',
    difficulty: 'Intermediate',
    duration: 20,
    passage: `Colour is one of the most powerful yet underestimated tools in a marketer's arsenal. Research suggests that up to 90% of snap judgements about products are based on colour alone, and a study published in the Journal of Consumer Psychology found that the perceived appropriateness of a colour for a given brand is more important than the colour itself.

Red, for instance, is universally associated with urgency and excitement. Fast-food chains like McDonald's and KFC use red extensively because it has been shown to increase heart rate and stimulate appetite. In sales contexts, red "Buy Now" buttons consistently outperform green ones by 21% in A/B testing.

Blue conveys trust and reliability, which explains its dominance among financial institutions and technology companies — Facebook, PayPal, and Samsung all feature blue prominently. A 2022 survey found that 33% of the world's top 100 brands use blue as their primary colour.

Green naturally signals health, sustainability, and freshness. Whole Foods, Starbucks (pre-2011), and The Body Shop leverage green to reinforce their eco-friendly positioning. However, researchers have noted a phenomenon called "green fatigue," where overuse of the colour in sustainability marketing can trigger consumer scepticism.

The cultural dimension adds further complexity. White symbolises purity in Western cultures but is associated with mourning in many East Asian societies. Similarly, purple is linked to luxury in Europe but has funereal connotations in Brazil.

Companies increasingly use neuroscience tools such as eye-tracking and EEG scans to optimise colour choices. Coca-Cola's decision to maintain its iconic red across 200+ markets — spending approximately $4 billion annually on branding — demonstrates the enduring power of colour consistency.`,
    questions: [
      { id: 1, type: 'fill-blank', question: '___% of snap judgements on products are based on colour.', correctAnswer: '90' },
      { id: 2, type: 'multiple-choice', question: 'What was more important than the colour itself?', options: ['Brightness', 'Perceived appropriateness', 'Colour intensity', 'Contrast ratio'], correctAnswer: 'Perceived appropriateness' },
      { id: 3, type: 'true-false-notgiven', question: 'Red "Buy Now" buttons outperform green ones by 21%.', correctAnswer: 'True' },
      { id: 4, type: 'fill-blank', question: '___% of the world\'s top 100 brands use blue as primary colour.', correctAnswer: '33' },
      { id: 5, type: 'true-false-notgiven', question: 'Starbucks currently uses green in its branding.', correctAnswer: 'Not Given' },
      { id: 6, type: 'multiple-choice', question: 'What is "green fatigue"?', options: ['Physical tiredness from green light', 'Consumer scepticism from overuse of green in sustainability marketing', 'A medical condition', 'A new branding strategy'], correctAnswer: 'Consumer scepticism from overuse of green in sustainability marketing' },
      { id: 7, type: 'true-false-notgiven', question: 'Purple is associated with luxury in Brazil.', correctAnswer: 'False' },
      { id: 8, type: 'fill-blank', question: 'Coca-Cola spends approximately $___billion annually on branding.', correctAnswer: '4' },
    ],
  },
  {
    id: 'read-3',
    type: 'reading',
    title: 'Passage 3 – Artificial Intelligence and the Future of Work',
    description: 'An analytical essay on how AI will reshape employment landscapes worldwide.',
    difficulty: 'Advanced',
    duration: 20,
    passage: `The debate over whether artificial intelligence will create more jobs than it destroys has intensified dramatically since the release of large language models in 2023. The World Economic Forum's 2024 Future of Jobs Report surveyed 803 companies across 27 industries and concluded that AI will displace 85 million jobs globally by 2027, while simultaneously creating 97 million new roles — a net positive of 12 million.

However, this optimistic aggregate figure masks a deeply uneven distribution. The report found that clerical and administrative roles face the highest displacement risk, with 26 million positions expected to disappear. In contrast, AI-related positions — including data analysts, machine learning engineers, and AI ethicists — represent the fastest-growing job category, with demand projected to increase by 40% annually.

The geographical impact varies considerably. Developing economies with large populations employed in routine manufacturing and call-centre work are disproportionately vulnerable. Goldman Sachs estimates that 300 million full-time jobs globally could be partially automated, with legal, administrative, and financial services most exposed.

Education systems face an unprecedented challenge. A McKinsey study estimates that 375 million workers — roughly 14% of the global workforce — may need to switch occupational categories entirely by 2030. This requires not merely retraining but fundamental reskilling — teaching analytical thinking, creative problem-solving, and human interface management.

Perhaps most controversially, AI has begun to impact "knowledge work" traditionally considered automation-proof. The legal profession, for example, has seen AI tools reduce document review time by 60–80%, while AI-generated journalism now accounts for approximately 15% of financial news articles produced by major wire services.

The emerging consensus among labour economists is not that AI will eliminate work altogether, but that it will fundamentally restructure what humans do. As Professor Erik Brynjolfsson of Stanford argues, "The question isn't whether AI will change work — it already has. The question is whether we will manage the transition wisely."`,
    questions: [
      { id: 1, type: 'fill-blank', question: 'How many companies were surveyed for the WEF 2024 report?', correctAnswer: '803' },
      { id: 2, type: 'multiple-choice', question: 'What is the net job change predicted by 2027?', options: ['12 million decrease', '12 million increase', '85 million increase', '97 million decrease'], correctAnswer: '12 million increase' },
      { id: 3, type: 'fill-blank', question: 'How many clerical/administrative positions are expected to disappear (millions)?', correctAnswer: '26' },
      { id: 4, type: 'true-false-notgiven', question: 'AI-related jobs are projected to grow by 40% annually.', correctAnswer: 'True' },
      { id: 5, type: 'multiple-choice', question: 'How many jobs could be partially automated according to Goldman Sachs?', options: ['100 million', '200 million', '300 million', '400 million'], correctAnswer: '300 million' },
      { id: 6, type: 'fill-blank', question: 'What percentage of the global workforce may need to switch categories by 2030?', correctAnswer: '14' },
      { id: 7, type: 'true-false-notgiven', question: 'AI has reduced legal document review time by 40–50%.', correctAnswer: 'False' },
      { id: 8, type: 'multiple-choice', question: 'Who argues we need to manage the AI transition wisely?', options: ['Goldman Sachs CEO', 'Professor Brynjolfsson', 'WEF Director', 'McKinsey partner'], correctAnswer: 'Professor Brynjolfsson' },
    ],
  },
  {
    id: 'read-4',
    type: 'reading',
    title: 'Full Reading Test (3 Passages)',
    description: 'A complete reading test with 3 passages of increasing difficulty.',
    difficulty: 'Advanced',
    duration: 60,
    passage: `PASSAGE A — The History of Timekeeping
Humans have measured time for at least 5,000 years. The earliest sundials, found in Egypt, date to approximately 1500 BCE. Water clocks (clepsydra) offered the first weather-independent time measurement around 1400 BCE. Mechanical clocks appeared in European monasteries in the 13th century, and the pendulum clock, invented by Christiaan Huygens in 1656, achieved accuracy within 15 seconds per day. The quartz crystal oscillator, developed in 1927, improved precision to within 0.02 seconds per day. Today's caesium atomic clocks are accurate to one second in 300 million years.

PASSAGE B — Coral Bleaching Events
Mass coral bleaching occurs when ocean temperatures rise more than 1°C above the seasonal maximum for sustained periods. The Great Barrier Reef experienced its worst bleaching event in 2022, affecting 91% of reefs surveyed. Scientists from James Cook University found that corals can recover if temperatures return to normal within 8–10 weeks, but repeated stress events — which have occurred in 2016, 2017, 2020, and 2022 — leave insufficient recovery time. The reef supports approximately 64,000 jobs and contributes AUD 6.4 billion annually to Australia's economy.

PASSAGE C — Language Extinction
Of the approximately 7,000 languages spoken worldwide, linguists estimate that one language dies every 14 days. UNESCO classifies 2,500 languages as endangered. Papua New Guinea is the most linguistically diverse country, with 840 living languages. The Endangered Languages Project, launched by Google in 2012, has documented over 3,400 languages and their endangerment levels.`,
    questions: [
      { id: 1, type: 'fill-blank', question: '(A) When were the earliest sundials found (BCE)?', correctAnswer: '1500' },
      { id: 2, type: 'multiple-choice', question: '(A) Who invented the pendulum clock?', options: ['Galileo', 'Newton', 'Christiaan Huygens', 'Robert Hooke'], correctAnswer: 'Christiaan Huygens' },
      { id: 3, type: 'true-false-notgiven', question: '(A) Atomic clocks are accurate to one second in 300 million years.', correctAnswer: 'True' },
      { id: 4, type: 'fill-blank', question: '(B) What percentage of Great Barrier Reef was affected in 2022?', correctAnswer: '91' },
      { id: 5, type: 'multiple-choice', question: '(B) How many weeks do corals need to recover?', options: ['4–6 weeks', '6–8 weeks', '8–10 weeks', '10–12 weeks'], correctAnswer: '8–10 weeks' },
      { id: 6, type: 'fill-blank', question: '(B) How many jobs does the reef support?', correctAnswer: '64000' },
      { id: 7, type: 'multiple-choice', question: '(C) How often does a language die?', options: ['Every 7 days', 'Every 14 days', 'Every 30 days', 'Every month'], correctAnswer: 'Every 14 days' },
      { id: 8, type: 'fill-blank', question: '(C) How many living languages does Papua New Guinea have?', correctAnswer: '840' },
    ],
  },
]

// ── Writing Exercises ────────────────────────────────────────────────
export const writingExercises: Exercise[] = [
  {
    id: 'write-1',
    type: 'writing',
    title: 'Task 1 – Bar Chart Description',
    description: 'Describe the main features of a bar chart showing internet usage by age group.',
    difficulty: 'Intermediate',
    duration: 20,
    prompt: `The bar chart below shows the percentage of adults in five age groups who used the internet daily in 2010 and 2020.

Age Group | 2010 | 2020
16–24     | 78%  | 98%
25–34     | 72%  | 95%
35–49     | 58%  | 89%
50–64     | 35%  | 72%
65+       | 12%  | 45%

Write at least 150 words summarising the information. Select and report the main features, and make comparisons where relevant.`,
    modelAnswer: `The bar chart compares daily internet usage across five age categories in 2010 and 2020.

Overall, internet use increased significantly in every age group over the decade, with the most dramatic growth among older demographics. The youngest groups maintained the highest usage rates in both years.

In 2010, 78% of 16-24-year-olds used the internet daily, making them the most connected group, followed closely by 25-34-year-olds at 72%. By 2020, both groups had reached near-universal adoption at 98% and 95% respectively — an increase of 20 and 23 percentage points.

The middle-aged group (35-49) saw substantial growth from 58% to 89%, while the 50-64 age bracket more than doubled its daily usage from 35% to 72%.

Perhaps most striking was the transformation among the over-65s. Their daily internet use nearly quadrupled, rising from just 12% to 45%, representing the largest proportional increase despite remaining the lowest overall.`,
    criteria: [
      'Task Achievement: addressed all parts of the task, clear overview, key features highlighted',
      'Coherence & Cohesion: logical paragraph structure, clear progression, linking devices',
      'Lexical Resource: varied vocabulary, accurate academic register',
      'Grammatical Range: complex sentences, range of structures, accuracy',
    ],
    questions: [],
  },
  {
    id: 'write-2',
    type: 'writing',
    title: 'Task 1 – Formal Letter',
    description: 'Write a formal letter to a local council about a community issue.',
    difficulty: 'Beginner',
    duration: 20,
    prompt: `You live in a residential area near a park. Recently, the park has been poorly maintained, causing problems for local residents.

Write a letter to the city council. In your letter:
• Describe the current condition of the park
• Explain how it affects local residents
• Suggest some improvements

Write at least 150 words. Begin your letter as follows: Dear Sir or Madam,`,
    modelAnswer: `Dear Sir or Madam,

I am writing to express my concern about the deteriorating condition of Riverside Park, which is located adjacent to Oak Street where I have lived for the past seven years.

Over recent months, the park has fallen into a state of disrepair. The grass has not been mowed for what appears to be several weeks, and litter — including broken glass and discarded food packaging — is frequently scattered across the pathways. Additionally, two of the three park benches are damaged, and the children's playground equipment appears rusty and potentially unsafe.

This neglect affects local residents considerably. Families with young children can no longer use the playground safely, dog walkers avoid the area due to broken glass, and the accumulation of rubbish has attracted vermin, which neighbouring households have reported seeing near their properties.

I would respectfully suggest that the council implement a weekly maintenance schedule, repair or replace the damaged facilities, and install additional waste bins with regular collection. A community clean-up event, supported by council resources, could also help restore the park to its former condition.

I look forward to your prompt response.

Yours faithfully,
[Your name]`,
    criteria: [
      'Task Achievement: all three bullet points addressed, appropriate tone and format',
      'Coherence & Cohesion: clear paragraphing by topic, logical flow',
      'Lexical Resource: formal vocabulary, accurate word choice',
      'Grammatical Range: formal structures, conditional and passive voice',
    ],
    questions: [],
  },
  {
    id: 'write-3',
    type: 'writing',
    title: 'Task 2 – Opinion Essay',
    description: 'Write an opinion essay on whether university education should be free.',
    difficulty: 'Advanced',
    duration: 40,
    prompt: `Some people believe that university education should be free for all students, regardless of their financial background. Others argue that students should pay for their own higher education.

Discuss both views and give your own opinion.

Write at least 250 words.`,
    modelAnswer: `The question of whether university education should be funded by the state or by students themselves remains one of the most debated issues in education policy. While both positions have merit, I believe a balanced approach combining public funding with reasonable contributions is most sustainable.

Those who advocate for free university education argue that it promotes social mobility and equal opportunity. When tuition fees represent a barrier, talented students from disadvantaged backgrounds may be discouraged from pursuing higher education, perpetuating cycles of inequality. Countries such as Germany and Norway, which offer free university education, consistently rank highly in social mobility indices. Furthermore, an educated population generates broader economic benefits through higher tax revenues, innovation, and reduced welfare dependency.

On the other hand, opponents contend that free higher education places an unsustainable burden on public finances. In the UK, for example, the student loan system costs the government approximately £20 billion annually, and abolishing fees would more than double this figure. Critics also argue that when education is entirely free, students may undervalue it, leading to higher dropout rates. Additionally, not all degrees generate equal economic returns, and taxpayers should not be expected to subsidise courses with limited employment prospects.

In my view, the optimal solution lies in a hybrid model. Governments should fund tuition for students from lower-income households and for disciplines with critical workforce shortages — such as healthcare, engineering, and education — while requiring graduates in higher-earning fields to contribute a portion of their income after reaching a minimum salary threshold. This income-contingent approach, similar to Australia's HECS system, balances accessibility with fiscal responsibility.

In conclusion, while the aspiration of entirely free education is admirable, a targeted and sustainable funding model better serves both individual students and society as a whole.`,
    criteria: [
      'Task Achievement: both views discussed, clear personal opinion, well-developed arguments',
      'Coherence & Cohesion: introduction, body paragraphs for each view, conclusion',
      'Lexical Resource: academic vocabulary, precise word choice, no repetition',
      'Grammatical Range: complex sentences, conditionals, relative clauses',
    ],
    questions: [],
  },
  {
    id: 'write-4',
    type: 'writing',
    title: 'Task 2 – Discussion Essay',
    description: 'Discuss the advantages and disadvantages of remote work.',
    difficulty: 'Intermediate',
    duration: 40,
    prompt: `Working from home has become increasingly common in many countries. Some people think this is a positive development, while others think it causes problems.

Discuss both views and give your own opinion.

Write at least 250 words.`,
    modelAnswer: `The shift towards remote work, accelerated by the global pandemic, has fundamentally altered employment patterns worldwide. While this transformation offers clear benefits, it also presents challenges that merit careful consideration.

Proponents of remote work highlight several compelling advantages. Employees save an average of 72 minutes per day by eliminating commuting, time that can be redirected to productive work or personal well-being. Studies by Stanford University found that remote workers are 13% more productive than their office-based counterparts. Furthermore, companies benefit from reduced overheads — IBM reportedly saved $50 million annually on real estate after transitioning to remote work. The environmental impact is equally significant, with reduced commuting cutting carbon emissions substantially.

However, remote work is not without drawbacks. Social isolation represents a significant concern; a 2023 Gallup survey revealed that 40% of remote workers reported feelings of loneliness. The blurring of boundaries between professional and personal life can lead to overwork, with remote employees working an average of 1.4 hours more per day. Additionally, collaboration and innovation may suffer — spontaneous interactions that often spark creative ideas are difficult to replicate in virtual settings. Junior employees, in particular, may miss valuable mentoring opportunities.

In my opinion, the ideal approach is a hybrid model that combines the flexibility of remote work with regular in-person collaboration. Companies could designate two or three office days per week for team activities while allowing remote work for focused individual tasks. This balanced approach preserves the benefits of both arrangements while mitigating their respective disadvantages.

In conclusion, remote work is neither universally positive nor negative, and its success depends largely on thoughtful implementation that considers both employee needs and organisational objectives.`,
    criteria: [
      'Task Achievement: advantages and disadvantages discussed, opinion clearly stated',
      'Coherence & Cohesion: well-paragraphed, topic sentences, linking words',
      'Lexical Resource: topic-specific vocabulary, synonyms and paraphrasing',
      'Grammatical Range: passive voice, conditionals, comparative structures',
    ],
    questions: [],
  },
  {
    id: 'write-5',
    type: 'writing',
    title: 'Full Writing Test (Task 1 + Task 2)',
    description: 'Complete both writing tasks under timed conditions.',
    difficulty: 'Advanced',
    duration: 60,
    prompt: `TASK 1 (20 minutes, 150+ words):
The table shows the proportion of household spending on food, housing, clothing, and entertainment in four countries in 2023.

Country     | Food | Housing | Clothing | Entertainment
Japan       | 18%  | 28%     | 5%       | 12%
UK          | 11%  | 32%     | 6%       | 14%
Brazil      | 25%  | 22%     | 7%       | 8%
Nigeria     | 40%  | 15%     | 8%       | 3%

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

---

TASK 2 (40 minutes, 250+ words):
Some people believe that governments should spend money on public services rather than spending on arts such as music and painting.

To what extent do you agree or disagree?`,
    modelAnswer: `[TASK 1 MODEL ANSWER]
The table compares the percentage of household income spent on four categories across Japan, the UK, Brazil, and Nigeria in 2023.

Overall, housing dominated spending in Japan and the UK, while food was the largest expense in Brazil and Nigeria. Entertainment spending was consistently the lowest or second-lowest category.

In Nigeria, a striking 40% of household income went towards food — more than double that in Japan (18%) and nearly four times the UK figure (11%). Conversely, housing costs were lowest in Nigeria at 15% but highest in the UK at 32%, followed by Japan at 28%.

Clothing expenditure was relatively uniform across all countries (5-8%), while entertainment spending showed a clear correlation with economic development: the UK led at 14%, followed by Japan (12%), with Brazil (8%) and Nigeria (3%) spending considerably less.

[TASK 2 MODEL ANSWER]
The allocation of government budgets between practical public services and the arts is a contentious issue. While I acknowledge the critical importance of services like healthcare and education, I disagree with the view that arts funding should be sacrificed entirely. A balanced approach is essential for a thriving society.

Public services unquestionably form the foundation of a functioning state. Healthcare systems save lives, education builds human capital, and infrastructure enables economic activity. In developing nations where millions lack access to clean water or basic medical care, directing resources to these fundamentals seems an obvious priority.

However, characterising the arts as an unnecessary luxury overlooks their substantial economic and social contributions. The creative industries in the UK alone contribute £116 billion annually and employ 2.3 million people. Museums, galleries, and music venues attract tourism revenue and regenerate urban areas. Moreover, the arts play a vital role in education, mental health, and cultural identity — benefits that are difficult to quantify but deeply significant.

Furthermore, the dichotomy between "practical services" and the arts is false. Music therapy is increasingly used in healthcare, design thinking improves public infrastructure, and cultural programmes reduce antisocial behaviour among young people.

In conclusion, governments should not view arts funding as competing with public services but as complementing them. A society that invests solely in material needs while neglecting cultural and creative expression risks becoming efficient but uninspired.`,
    criteria: [
      'Task 1: data accurately reported, key trends identified, appropriate length',
      'Task 2: clear position, well-developed arguments with examples, logical conclusion',
      'Coherence & Cohesion: both tasks well-organised with clear paragraphing',
      'Lexical Resource & Grammar: academic register, accurate complex structures',
    ],
    questions: [],
  },
]

// ── Speaking Exercises ───────────────────────────────────────────────
export const speakingExercises: Exercise[] = [
  {
    id: 'speak-1',
    type: 'speaking',
    title: 'Part 1 – Introduction & Interview',
    description: 'Answer familiar topic questions about yourself, your home, work, studies, and interests.',
    difficulty: 'Beginner',
    duration: 5,
    cueCard: 'The examiner will ask you questions on familiar topics. Try to give extended answers (2–3 sentences each). Don\'t give one-word responses.',
    followUpQuestions: [
      'Where are you from? Can you tell me about your hometown?',
      'Do you work or study? What do you enjoy most about it?',
      'How do you usually spend your weekends?',
      'Do you prefer to spend time indoors or outdoors? Why?',
      'What kind of music do you enjoy listening to?',
      'Have you travelled abroad? Where would you like to go?',
      'Do you prefer reading books or watching films? Why?',
      'What is your favourite type of food?',
      'How important is exercise in your life?',
      'Do you use social media? What platforms do you use most?',
    ],
    sampleAnswers: [
      'I\'m from Hanoi, the capital of Vietnam. It\'s a bustling city with a fascinating mix of modern development and traditional culture. I particularly love the Old Quarter with its narrow streets and incredible street food.',
      'I\'m currently studying Computer Science at university. What I enjoy most is the problem-solving aspect — there\'s something deeply satisfying about writing code that actually works and solves real problems.',
      'On weekends, I usually try to balance relaxation with being productive. Saturday mornings I often go to a café to study, and in the afternoon I meet friends. Sundays are more relaxed — I might cook something new or watch a documentary.',
    ],
    questions: [],
  },
  {
    id: 'speak-2',
    type: 'speaking',
    title: 'Part 2 – A Book That Influenced You',
    description: 'Speak for 1–2 minutes about a book that had a significant impact on you.',
    difficulty: 'Intermediate',
    duration: 4,
    cueCard: `Describe a book that had a significant influence on you.

You should say:
• what the book is called and who wrote it
• what it is about
• when and why you read it

And explain how this book influenced you.

You have 1 minute to prepare. Then speak for 1–2 minutes.`,
    followUpQuestions: [
      'Do you think reading is becoming less popular among young people?',
      'What are the advantages of reading books compared to watching films?',
      'Should schools require students to read certain books? Why or why not?',
      'How has technology changed the way people read?',
    ],
    sampleAnswers: [
      'The book that had the greatest impact on me is "Sapiens" by Yuval Noah Harari. It\'s a sweeping history of humankind, covering everything from the Cognitive Revolution 70,000 years ago to the present day. I read it during my gap year, and it completely transformed how I think about human societies, economics, and even religion. What struck me most was the idea that much of what holds human civilisation together — money, nations, human rights — are essentially shared stories we all agree to believe in.',
    ],
    questions: [],
  },
  {
    id: 'speak-3',
    type: 'speaking',
    title: 'Part 3 – Technology and Society',
    description: 'Discuss abstract ideas about technology\'s impact on daily life.',
    difficulty: 'Advanced',
    duration: 5,
    cueCard: 'In Part 3, the examiner will ask deeper, more abstract questions related to the Part 2 topic. Give detailed answers with examples, reasons, and your personal perspective.',
    followUpQuestions: [
      'How has technology changed the way people communicate?',
      'Do you think people are too dependent on technology nowadays?',
      'What are the potential dangers of artificial intelligence for society?',
      'How might education change in the next 20 years due to technology?',
      'Should governments regulate social media more strictly? Why or why not?',
      'Do you think technology creates more problems than it solves?',
    ],
    sampleAnswers: [
      'Technology has fundamentally transformed communication. On one hand, we can now connect with anyone anywhere instantly through messaging apps and video calls. On the other hand, some argue that the quality of communication has declined — we send hundreds of messages but have fewer meaningful conversations. Personally, I think the key is to use technology as a tool rather than letting it replace genuine human interaction.',
      'I think there\'s definitely a growing concern about over-dependence on technology. For example, many people can\'t navigate without GPS or remember phone numbers without their contacts list. However, I wouldn\'t say this is entirely negative — technology frees up our mental bandwidth for more complex tasks. The issue arises when we lose fundamental skills or become unable to function during technical outages.',
    ],
    questions: [],
  },
  {
    id: 'speak-4',
    type: 'speaking',
    title: 'Full Speaking Mock (Parts 1–3)',
    description: 'Complete all three parts of the speaking test in a simulated session.',
    difficulty: 'Advanced',
    duration: 14,
    cueCard: `FULL SPEAKING TEST SIMULATION

PART 1 (4–5 minutes): The examiner will ask about familiar topics.
PART 2 (3–4 minutes): You will receive a cue card. Prepare for 1 minute, then speak for 1–2 minutes.
PART 3 (4–5 minutes): Discussion questions related to Part 2.

— CUE CARD FOR PART 2 —
Describe a skill you learned that you are proud of.

You should say:
• what the skill is
• how you learned it
• how long it took you to learn

And explain why you are proud of this skill.`,
    followUpQuestions: [
      'PART 1: What is your full name? Where do you come from?',
      'PART 1: Do you enjoy learning new things? What have you learned recently?',
      'PART 1: How do you usually relax after a busy day?',
      'PART 2: [Use the cue card above — prepare for 1 minute, then speak for 1–2 minutes]',
      'PART 3: Do you think some skills are more valuable than others?',
      'PART 3: How has the internet changed the way people learn new skills?',
      'PART 3: Is it better to learn from a teacher or to be self-taught?',
      'PART 3: What skills do you think will be most important in the future?',
    ],
    sampleAnswers: [
      'Part 2 sample: A skill I\'m particularly proud of is public speaking. I used to be terrified of standing in front of an audience — my hands would shake and I\'d lose my train of thought. I joined Toastmasters about two years ago, and through weekly practice sessions, constructive feedback, and gradually taking on more challenging speaking roles, I\'ve transformed from someone who dreaded presentations into a confident speaker. It took about 8 months of regular practice before I felt truly comfortable. I\'m proud of this because it required confronting a deep-seated fear, and the skills I\'ve gained have been invaluable in my professional life.',
    ],
    questions: [],
  },
]

/** Helper to get exercises by skill type */
export function getExercisesByType(type: Exercise['type']): Exercise[] {
  switch (type) {
    case 'listening': return listeningExercises
    case 'reading':   return readingExercises
    case 'writing':   return writingExercises
    case 'speaking':  return speakingExercises
    default:          return []
  }
}
