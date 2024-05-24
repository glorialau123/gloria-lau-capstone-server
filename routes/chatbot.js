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

const checkStatusAndPrintMessages = async (threadId, runId) => {
  const maxPollingTime = 30000; //30 sec max time to wait for completion
  const pollingInterval = 2000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxPollingTime) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId);
      const conversation = messages.data.map((msg) => {
        const role = msg.role;
        const content = msg.content[0].text.value;
        const roleName = role === "assistant" ? "Mr. Fluff" : role;

        return `${roleName.charAt(0).toUpperCase() + roleName.slice(1)}: ${content}`;
      });
      return conversation;
    }
    //if run status is not complete, function waits for polling interval to pass before checking status again
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
  }
  throw new Error("Run did not complete within expected time");
};

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
    const conversation = await checkStatusAndPrintMessages(threadId, run.id);
    res.status(200).json({ conversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
