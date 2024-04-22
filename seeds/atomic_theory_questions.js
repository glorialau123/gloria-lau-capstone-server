/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("atomicTheoryOptions").del();
  await knex("atomicTheoryQuestions").del();

  const atomicTheoryData = [
    {
      id: 1,
      text: "Who proposed the plum pudding model of the atom?",
      options: [
        { id: 1, text: "Ernest Rutherford", isCorrect: false },
        { id: 2, text: "Niels Bohr", isCorrect: false },
        { id: 3, text: "J.J. Thomson", isCorrect: true },
        { id: 4, text: "Democritus", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "What does the atomic number of an element represent?",
      options: [
        { id: 5, text: "Number of protons", isCorrect: true },
        { id: 6, text: "Number of neutrons", isCorrect: false },
        { id: 7, text: "Number of electrons", isCorrect: false },
        { id: 8, text: "Atomic mass", isCorrect: false },
      ],
    },
    {
      id: 3,
      text: "What is the total number of electrons in a neutral atom of carbon-12?",
      options: [
        { id: 9, text: "6", isCorrect: true },
        { id: 10, text: "12", isCorrect: false },
        { id: 11, text: "24", isCorrect: false },
        { id: 12, text: "18", isCorrect: false },
      ],
    },
    {
      id: 4,
      text: "Which subatomic particle determines the chemical properties of an element?",
      options: [
        { id: 13, text: "Proton", isCorrect: true },
        { id: 14, text: "Electron", isCorrect: false },
        { id: 15, text: "Neutron", isCorrect: false },
        { id: 16, text: "Photon", isCorrect: false },
      ],
    },
    {
      id: 5,
      text: "What is the term for atoms of the same element with different numbers of neutrons?",
      options: [
        { id: 17, text: "Isotopes", isCorrect: true },
        { id: 18, text: "Ions", isCorrect: false },
        { id: 19, text: "Molecules", isCorrect: false },
        { id: 20, text: "Compounds", isCorrect: false },
      ],
    },
    {
      id: 6,
      text: "Who proposed the planetary model of the atom?",
      options: [
        { id: 21, text: "Ernest Rutherford", isCorrect: false },
        { id: 22, text: "Niels Bohr", isCorrect: true },
        { id: 23, text: "J.J. Thomson", isCorrect: false },
        { id: 24, text: "Democritus", isCorrect: false },
      ],
    },
    {
      id: 7,
      text: "What is the charge of a neutron?",
      options: [
        { id: 25, text: "Positive", isCorrect: false },
        { id: 26, text: "Negative", isCorrect: false },
        { id: 27, text: "Neutral", isCorrect: true },
        { id: 28, text: "Variable", isCorrect: false },
      ],
    },
    {
      id: 8,
      text: "What is the name of the process by which unstable atomic nuclei lose energy?",
      options: [
        { id: 29, text: "Fission", isCorrect: false },
        { id: 30, text: "Fusion", isCorrect: false },
        { id: 31, text: "Radioactive decay", isCorrect: true },
        { id: 32, text: "Ionization", isCorrect: false },
      ],
    },
    {
      id: 9,
      text: "Which scientist proposed that electrons move in specific orbits around the nucleus?",
      options: [
        { id: 33, text: "Ernest Rutherford", isCorrect: false },
        { id: 34, text: "Niels Bohr", isCorrect: true },
        { id: 35, text: "J.J. Thomson", isCorrect: false },
        { id: 36, text: "Democritus", isCorrect: false },
      ],
    },
    {
      id: 10,
      text: "What type of ion is formed when an atom loses electrons?",
      options: [
        { id: 45, text: "Cation", isCorrect: true },
        { id: 46, text: "Anion", isCorrect: false },
        { id: 47, text: "Neutral ion", isCorrect: false },
        { id: 48, text: "Ionic compound", isCorrect: false },
      ],
    },
  ];

  const questionRows = [];
  const optionsRows = [];

  for (const questionData of atomicTheoryData) {
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

  await knex("atomicTheoryQuestions").insert(questionRows);

  await knex("atomicTheoryOptions").insert(optionsRows);
};
