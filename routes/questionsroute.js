const express = require("express");
const router = express.Router();
const fs = require("fs");
const knexConfig = require("../knexfile");
const { setEngine } = require("crypto");
const knex = require("knex")(knexConfig);

//original: using JSON files
//get single question based on question id passed with params
// router.get("/:topicname/:id", (req, res) => {
//   try {
//     const { topicname, id } = req.params;

//     const allQuestionsBuffer = fs.readFileSync(`./data/${topicname}.json`);
//     const allQuestions = JSON.parse(allQuestionsBuffer);
//     const selectedQuestion = allQuestions.find(
//       (questionItem) => questionItem.id === parseInt(id)
//     );
//     if (selectedQuestion) {
//       res.status(200).send(selectedQuestion);
//     } else {
//       res.status(404).send("A question with that id is not found");
//     }
//   } catch (error) {
//     res.status(500).send("Internal server error.");
//   }
// });

//TODO test with databases
//need to join table where question_id is the same for the options
router.get("/:topicname/:id", async (req, res) => {
  const { topicname, id } = req.params;
  console.log("topic name", topicname);
  console.log("id", id);

  try {
    const selectedQuestion = await knex(`${topicname}Questions`).where("id", id);

    if (selectedQuestion.length === 0) {
      return res.status(400).json({ error: "Question not found" });
    }

    const options = await knex(`${topicname}Options`)
      .where("question_id", id)
      .select("id as option_id", "text as option_text", "isCorrect");

    selectedQuestion[0].options = options;
    console.log(selectedQuestion);
    res.status(200).json(selectedQuestion[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   const data = await knex(`${topicname}Questions`).select(
  //     "id as question_id",
  //     "text as question_text"
  //   );

  //   await Promise.all(
  //     data.map(async (question) => {
  //       const options = await knex(`${topicname}Options`)
  //         .where("question_id", question.question_id)
  //         .select("id as option_id", "text as option_text", "isCorrect");
  //       question.options = options;
  //     })
  //   );

  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

  // try {
  //   const data = await knex("acidBaseOptions")
  //     .join("acidBaseQuestions", "acidBaseQuestions.id", "acidBaseOptions.question_id")
  //     .select(
  //       "acidBaseQuestions.text as question_text",
  //       "acidBaseOptions.id as option_id",
  //       "acidBaseOptions.text as option_text",
  //       "acidBaseOptions.isCorrect"
  //     );
  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

module.exports = router;
