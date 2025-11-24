export const STATEMENTS = [
  // TRY HARD (1-4)
  { id: 1, pattern: 'tryhard', text: "Ik neem steeds meer taken op me, want niemand anders doet het goed genoeg" },
  { id: 2, pattern: 'tryhard', text: "Ik moet het allemaal zelf oplossen, anders vertrouwen ze me niet" },
  { id: 3, pattern: 'tryhard', text: "Als iets misgaat, ligt het aan mij" },
  { id: 4, pattern: 'tryhard', text: "Ik werk door tot ik het snap, ook als dat uren duurt" },
  
  // PLEASE (5-8)
  { id: 5, pattern: 'please', text: "Ik zeg vaak 'ja' terwijl ik 'nee' denk" },
  { id: 6, pattern: 'please', text: "Als iemand ontevreden lijkt, voel ik me onrustig" },
  { id: 7, pattern: 'please', text: "Ik pas mijn mening aan om conflict te vermijden" },
  { id: 8, pattern: 'please', text: "Nee zeggen voelt als iemand teleurstellen" },
  
  // BE PERFECT (9-12)
  { id: 9, pattern: 'beperfect', text: "Ik check alles minstens drie keer voordat ik het verstuur" },
  { id: 10, pattern: 'beperfect', text: "Ik werk iets helemaal uit voordat ik het deel, ook als een schets genoeg was" },
  { id: 11, pattern: 'beperfect', text: "Als ik een fout maak, blijf ik er dagen over denken" },
  { id: 12, pattern: 'beperfect', text: "Goed genoeg bestaat niet, het moet perfect" },
  
  // BE STRONG (13-16)
  { id: 13, pattern: 'bestrong', text: "Ik laat liever niet zien dat iets me raakt" },
  { id: 14, pattern: 'bestrong', text: "Om hulp vragen voelt als zwakte" },
  { id: 15, pattern: 'bestrong', text: "Ik blijf rustig, ook al voel ik stress" },
  { id: 16, pattern: 'bestrong', text: "Als ik twijfel, hou ik dat voor mezelf" },
  
  // HURRY UP (17-20)
  { id: 17, pattern: 'hurryup', text: "Ik heb altijd het gevoel dat ik te laat ben" },
  { id: 18, pattern: 'hurryup', text: "Traag werken voelt als tijdverspilling" },
  { id: 19, pattern: 'hurryup', text: "Ik doe drie dingen tegelijk" },
  { id: 20, pattern: 'hurryup', text: "Wachten op anderen maakt me ongeduldig" },
];

export const COACHING_QUESTIONS = {
  tryhard: "Wat zou er gebeuren als je om hulp zou vragen bij je volgende uitdaging?",
  please: "Welke ruimte ontstaat er als jij anderen mag teleurstellen?",
  beperfect: "Wat zou er gebeuren als je 'goed genoeg' zou toestaan in je werk?",
  bestrong: "Wat wordt mogelijk als je kwetsbaarheid zou tonen aan je team?",
  hurryup: "Wat zou veranderen als je tempo zou vertragen, juist onder druk?",
};

export const PATTERN_DESCRIPTIONS = {
  tryhard: {
    name: "TRY HARD",
    nameNL: "BLIJVEN PROBEREN",
    dont: "DON'T ASK FOR HELP",
    dontNL: "VRAG NIET OM HULP",
    characteristics: [
      "Je wilt bewijzen dat je het waard bent",
      "Je lost alles zelf op",
      "Taken stapelen zich op"
    ],
    triggers: [
      "Nieuwe opdrachten",
      "Meetings met seniors"
    ]
  },
  please: {
    name: "PLEASE",
    nameNL: "PLEASEN",
    dont: "DON'T DISAPPOINT",
    dontNL: "STEL NIEMAND TELEUR",
    characteristics: [
      "Je wilt iedereen tevreden houden",
      "Nee zeggen is moeilijk",
      "Je past je aan voor harmonie"
    ],
    triggers: [
      "Conflictsituaties",
      "Ontevreden gezichten"
    ]
  },
  beperfect: {
    name: "BE PERFECT",
    nameNL: "WEES PERFECT",
    dont: "DON'T MAKE MISTAKES",
    dontNL: "MAAK GEEN FOUTEN",
    characteristics: [
      "Je stelt hoge eisen aan jezelf",
      "Fouten voelen zwaar",
      "Je checkt alles meerdere keren"
    ],
    triggers: [
      "Nieuwe presentaties",
      "Belangrijke meetings"
    ]
  },
  bestrong: {
    name: "BE STRONG",
    nameNL: "WEES STERK",
    dont: "DON'T BE VULNERABLE",
    dontNL: "WEES NIET KWETSBAAR",
    characteristics: [
      "Je toont geen zwakte",
      "Emoties hou je binnen",
      "Om hulp vragen is lastig"
    ],
    triggers: [
      "Moeilijke momenten",
      "Voor het team staan"
    ]
  },
  hurryup: {
    name: "HURRY UP",
    nameNL: "HAASTEN",
    dont: "DON'T TAKE TIME",
    dontNL: "NEEM GEEN TIJD",
    characteristics: [
      "Je hebt altijd haast",
      "Wachten is moeilijk",
      "Je doet meerdere dingen tegelijk"
    ],
    triggers: [
      "Deadlines",
      "Trage processen"
    ]
  }
};

// Shuffle array function
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Pattern detection logic
export function detectDominantPattern(responses) {
  const counts = {
    tryhard: 0,
    please: 0,
    beperfect: 0,
    bestrong: 0,
    hurryup: 0
  };
  
  responses.forEach(response => {
    if (response.pattern && counts.hasOwnProperty(response.pattern)) {
      // Count different answer types with weights
      // Only count positive answers, 'nee' and 'helemaal_niet' don't count at all
      if (response.answer === 'ja') {
        counts[response.pattern] += 3; // Strong yes
      } else if (response.answer === 'soms') {
        counts[response.pattern] += 1; // Sometimes (counts less)
      }
      // 'nee' and 'helemaal_niet' don't count at all
    }
  });
  
  // Find pattern with highest count
  let maxCount = 0;
  let dominantPattern = null;
  
  // Check each pattern to find the one with highest count
  const patternOrder = ['tryhard', 'please', 'beperfect', 'bestrong', 'hurryup'];
  
  patternOrder.forEach(pattern => {
    if (counts[pattern] > maxCount) {
      maxCount = counts[pattern];
      dominantPattern = pattern;
    }
  });
  
  // If no pattern has any "ja" answers, default to first pattern
  // This should not happen in normal flow, but is a safety fallback
  if (!dominantPattern || maxCount === 0) {
    return 'tryhard'; // Default fallback
  }
  
  return dominantPattern;
}

