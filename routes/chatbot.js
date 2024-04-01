const express = require("express");
const router = express.Router();
require("dotenv").config();
const OpenAI = require("openai");
const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI(OPENAI_API_KEY);

//create assistant once and store ID
async function main() {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "High School Science Teacher Mr.Fluff",
      instructions:
        "You are a science teacher but you are a cat called Mr.Fluff. Ask and answer only science-related questions. Respond to the user in easy to understand language, like a ten or twelve year old would understand. End your response with meow or meow meow. Your responses should be brief but relevant and not too wordy.",
      model: "gpt-3.5-turbo",
    });
  } catch (error) {
    console.error(error);
  }
}
//uncomment main() to run/create a new assistant
//main();

//copy new assistant ID from openai and use for variable assistantId
const assistantId = "asst_b8iAsAGq3CoIQTPLbQEzqzGJ";

//create thread function
async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread;
}

//add message function
//pass threadId so assistant knows which thread to add message to
async function addMessage(threadId, message) {
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

//route to create new thread via frontend axios call
router.get("/thread", async (req, res) => {
  try {
    const thread = await createThread();
    res.json({ threadId: thread.id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

//route to post new message via frontend axios call
router.post("/message", async (req, res) => {
  try {
    const { message, threadId } = req.body;
    await addMessage(threadId, message);
    //run assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    const runId = run.id;

    let conversation = []; // Array to store conversation messages

    const checkStatusAndPrintMessages = async (threadId, runId) => {
      let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      if (runStatus.status === "completed") {
        let messages = await openai.beta.threads.messages.list(threadId);
        messages.data.forEach((msg) => {
          const role = msg.role;
          const content = msg.content[0].text.value;
          const roleName = role === "assistant" ? "Mr. Fluff" : role;
          conversation.push(
            `${roleName.charAt(0).toUpperCase() + roleName.slice(1)}: ${content}`
          );
        });
        res.status(200).json({ conversation });
      } else {
        console.log("Run is not completed yet.");
        res.status(500).send("Internal server error.");
      }
    };

    setTimeout(() => {
      checkStatusAndPrintMessages(threadId, runId);
    }, 15000);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
