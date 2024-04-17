const express = require("express");
const router = express.Router();
const fs = require("fs");
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);

//get single question based on question id passed with params
router.get("/:topicname/:id", (req, res) => {
  try {
    const { topicname, id } = req.params;

    const allQuestionsBuffer = fs.readFileSync(`./data/${topicname}.json`);
    const allQuestions = JSON.parse(allQuestionsBuffer);
    const selectedQuestion = allQuestions.find(
      (questionItem) => questionItem.id === parseInt(id)
    );
    if (selectedQuestion) {
      res.status(200).send(selectedQuestion);
    } else {
      res.status(404).send("A question with that id is not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

//TODO test with database
//need to join table where question_id is the same for the options
router.get("/testing", async (req, res) => {
  console.log(knex);

  try {
    const data = await knex.select("*").from("acidBaseQuestions");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
