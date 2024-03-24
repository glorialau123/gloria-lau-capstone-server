const express = require("express");
const router = express.Router();
const fs = require("fs");

//get all questions
router.get("/review", (req, res) => {
  try {
    const allReviewQuestionsBuffer = fs.readFileSync("./data/assignment.json");
    const allReviewQuestions = JSON.parse(allReviewQuestionsBuffer);
    console.log(allReviewQuestions);
    res.status(200).send(allReviewQuestions);
  } catch (error) {
    res.status(500).send("Internal server error. Cannot retrieve all questions.");
  }
});

//get single question based on question id passed with params
router.get("/review/:id", (req, res) => {
  try {
    const { id } = req.params;

    const reviewQuestionsBuffer = fs.readFileSync("./data/assignment.json");
    const reviewQuestions = JSON.parse(reviewQuestionsBuffer);
    console.log("Parsed JSON:", reviewQuestions);
    console.log("question id is:", id);
    const selectedQuestion = reviewQuestions.find(
      (questionItem) => questionItem.id === parseInt(id)
    );
    console.log(selectedQuestion);
    if (selectedQuestion) {
      res.status(200).send(selectedQuestion);
    } else {
      res.status(404).send("A question with that id is not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
