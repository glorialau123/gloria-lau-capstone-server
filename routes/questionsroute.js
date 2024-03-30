const express = require("express");
const router = express.Router();
const fs = require("fs");

//Load questions
// const loadQuestions = (topic)=>{
//   try{
//     const allQuestionsBuffer = fs.readFileSync(`./data/${topic}.json`);
//     const allQuestions = JSON.parse(allQuestionsBuffer);
//     console.log(allQuestions);
//     res.status(200).send(allQuestions);
//   }catch(error){
//     res.status(500).send("Internal server error. Cannot retrieve all questions.");
//   }
// }

//get all questions
// router.get("/:topicname", (req, res) => {

//   try {
//     const {topicname} = req.params;
//     const allQuestionsBuffer = fs.readFileSync(`./data/${topicname}.json`);
//     const allQuestions = JSON.parse(allQuestionsBuffer);
//     console.log(allQuestions);
//     res.status(200).send(allQuestions);
//   } catch (error) {
//     res.status(500).send("Internal server error. Cannot retrieve all questions.");
//   }
// });

//get single question based on question id passed with params
router.get("/:topicname/:id", (req, res) => {
  try {
    const { topicname, id } = req.params;

    const allQuestionsBuffer = fs.readFileSync(`./data/${topicname}.json`);
    const allQuestions = JSON.parse(allQuestionsBuffer);
    console.log("Parsed JSON:", allQuestions);
    console.log("question id is:", id);
    const selectedQuestion = allQuestions.find(
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
