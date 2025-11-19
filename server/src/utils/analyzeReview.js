// utils/analyzeReview.js

export const POSITIVE_WORDS = [
  "amazing","awesome","excellent","fantastic","great","love","perfect",
  "wonderful","brilliant","outstanding","superb","phenomenal","incredible",
  "good","nice","best","beautiful","delightful","enjoyable","pleased"
];

export const NEGATIVE_WORDS = [
  "terrible","awful","horrible","bad","worst","hate","disgusting",
  "disappointing","poor","pathetic","useless","garbage","trash","crap",
  "sucks","boring","mediocre","waste","annoying","frustrating"
];

export const EXAGGERATION_WORDS = [
  "literally","absolutely","completely","totally","extremely","incredibly",
  "ridiculously","insanely","super","mega","ultra","mad","crazy","epic"
];

export const JUDGEMENTS = {
  hater: [
    "Certified Hater Badge Unlocked 🏆",
    "Someone woke up and chose violence today",
    "Professional critic or just miserable?",
    "This review radiates pure negativity"
  ],
  enjoyer: [
    "Peak Enjoyer Energy Detected ✨",
    "This person has never experienced disappointment",
    "Enthusiasm level: Maximum Overdrive",
    "Did the company pay you to write this?"
  ],
  contradictory: [
    "Your stars and words tell different stories 🤔",
    "Mixed signals detected. Make up your mind!"
  ],
  dramatic: [
    "Paragraph Warrior Achievement Unlocked 📜",
    "You wrote a whole essay. Respect."
  ],
  emoji_lord: [
    "Emoji Bard Status: Achieved 🎭",
    "Words were clearly too difficult"
  ],
  exaggerator: [
    "Exaggeration Level: Off The Charts",
    "Is everything really that extreme?"
  ],
  basic: [
    "Baseline Reviewer Energy",
    "This review is... a review"
  ]
};

export function analyzeReview(reviewText, rating) {
  const text = reviewText.toLowerCase();
  const words = text.split(/\s+/);

  const sentimentScore =
    POSITIVE_WORDS.filter(w => text.includes(w)).length -
    NEGATIVE_WORDS.filter(w => text.includes(w)).length;

  const emojiCount =
    (reviewText.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu) || []).length;

  const exaggerationCount = EXAGGERATION_WORDS.filter(w =>
    text.includes(w)
  ).length;

  const contradictionDetected =
    (rating >= 4 && sentimentScore < -1) ||
    (rating <= 2 && sentimentScore > 1);

  const wordCount = words.length;

  let category = "basic";
  if (contradictionDetected) category = "contradictory";
  else if (emojiCount >= 5) category = "emoji_lord";
  else if (wordCount > 100) category = "dramatic";
  else if (exaggerationCount >= 3) category = "exaggerator";
  else if (sentimentScore <= -3 || rating <= 2) category = "hater";
  else if (sentimentScore >= 3 || rating >= 4) category = "enjoyer";

  const judgementText =
    JUDGEMENTS[category][Math.floor(Math.random() * JUDGEMENTS[category].length)];

  const judgementTags = [category.toUpperCase()];
  if (emojiCount >= 3) judgementTags.push("EMOJI OVERLOAD");
  if (exaggerationCount >= 2) judgementTags.push("DRAMATIC");
  if (wordCount > 80) judgementTags.push("ESSAY MODE");

  return {
    judgementText,
    judgementTags,
    sentimentScore,
    contradictionDetected,
    stats: {
      wordCount,
      charCount: reviewText.length,
      emojiCount,
      exaggerationCount
    }
  };
}
