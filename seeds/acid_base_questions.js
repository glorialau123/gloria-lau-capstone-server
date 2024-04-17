/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("acidBaseOptions").del();
  await knex("acidBaseQuestions").del();

  const acidBaseData = [
    {
      id: 1,
      text: "What is the pH range for acids?",
      options: [
        { id: 1, text: "0 to 7", isCorrect: true },
        { id: 2, text: "7 to 14", isCorrect: false },
        { id: 3, text: "0 to 14", isCorrect: false },
        { id: 4, text: "-7 to 0", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "What is the pH range for bases?",
      options: [
        { id: 5, text: "0 to 7", isCorrect: false },
        { id: 6, text: "7 to 14", isCorrect: true },
        { id: 7, text: "0 to 14", isCorrect: false },
        { id: 8, text: "-7 to 0", isCorrect: false },
      ],
    },
    {
      id: 3,
      text: "What ion do acids produce when dissolved in water?",
      options: [
        { id: 9, text: "Hydroxide ions (OH⁻)", isCorrect: false },
        { id: 10, text: "Hydronium ions (H₃O⁺)", isCorrect: true },
        { id: 11, text: "Sodium ions (Na⁺)", isCorrect: false },
        { id: 12, text: "Chloride ions (Cl⁻)", isCorrect: false },
      ],
    },
    {
      id: 4,
      text: "What is the pH of a solution with [H⁺] = 1.0 x 10⁻⁶ M?",
      options: [
        { id: 13, text: "6", isCorrect: true },
        { id: 14, text: "7", isCorrect: false },
        { id: 15, text: "8", isCorrect: false },
        { id: 16, text: "5", isCorrect: false },
      ],
    },
    {
      id: 5,
      text: "Which of the following is a characteristic of bases?",
      options: [
        { id: 17, text: "Turns blue litmus paper red", isCorrect: false },
        { id: 18, text: "Sour taste", isCorrect: false },
        { id: 19, text: "Feel slippery", isCorrect: true },
        { id: 20, text: "Release H⁺ ions in water", isCorrect: false },
      ],
    },
    {
      id: 6,
      text: "What is the pH of a neutral solution?",
      options: [
        { id: 21, text: "0", isCorrect: false },
        { id: 22, text: "7", isCorrect: true },
        { id: 23, text: "14", isCorrect: false },
        { id: 24, text: "1", isCorrect: false },
      ],
    },
    {
      id: 7,
      text: "What happens to the pH of a solution when the concentration of hydrogen ions ([H⁺]) increases?",
      options: [
        { id: 25, text: "The pH increases", isCorrect: false },
        { id: 26, text: "The pH decreases", isCorrect: true },
        { id: 27, text: "The pH remains the same", isCorrect: false },
        { id: 28, text: "The pH becomes neutral", isCorrect: false },
      ],
    },
    {
      id: 8,
      text: "Which of the following is a strong acid?",
      options: [
        { id: 29, text: "HClO", isCorrect: false },
        { id: 30, text: "HNO₂", isCorrect: false },
        { id: 31, text: "H₂SO₄", isCorrect: true },
        { id: 32, text: "HC₂H₃O₂", isCorrect: false },
      ],
    },
    {
      id: 9,
      text: "What is the formula for hydrochloric acid?",
      options: [
        { id: 33, text: "HCl", isCorrect: true },
        { id: 34, text: "H₂SO₄", isCorrect: false },
        { id: 35, text: "HNO₃", isCorrect: false },
        { id: 36, text: "H₂O₂", isCorrect: false },
      ],
    },
    {
      id: 10,
      text: "What is the common name for sodium hydroxide?",
      options: [
        { id: 37, text: "Sulfuric acid", isCorrect: false },
        { id: 38, text: "Hydrochloric acid", isCorrect: false },
        { id: 39, text: "Sodium chloride", isCorrect: false },
        { id: 40, text: "Caustic soda", isCorrect: true },
      ],
    },
  ];

  const questionRows = [];
  const optionsRows = [];

  for (const questionData of acidBaseData) {
    questionRows.push({
      id: questionData.id,
      text: questionData.text,
    });

    for (const option of questionData.options) {
      optionsRows.push({
        id: option.id,
        question_id: questionData.id,
        text: option.text,
        isCorrect: option.isCorrect,
      });
    }
  }

  // Insert questions
  await knex("acidBaseQuestions").insert(questionRows);

  // Insert options
  await knex("acidBaseOptions").insert(optionsRows);
};
