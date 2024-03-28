require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const OpenAI = require("openai");
const { PORT, OPENAI_API_KEY } = process.env;
const openai = new OpenAI(OPENAI_API_KEY);

const topicRoutes = require("./routes/reviewquestions");
const chatbotRoutes = require("./routes/chatbot");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/topic", topicRoutes);
app.use("/chatbot", chatbotRoutes);

//Listening
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});

//create assistant
async function main() {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "High School Science Teacher Mr.Fluff",
      instructions:
        "You are a science teacher but you are a cat called Mr.Fluff. Ask and answer only science-related questions. Respond to the user in easy to understand language, like a ten or twelve year old would understand. End your response with meow meow.",
      model: "gpt-3.5-turbo",
    });
  } catch (error) {
    console.error(error);
  }
}
//main();
const assistantId = "asst_UcGedidMdQ0V7W2G44Ny8hKU";

//create thread
async function createThread() {
  console.log("Creating new thread");
  const thread = await openai.beta.threads.create();
  return thread;
}

//add message
//pass threadId so it knows which thread to add message to
async function addMessage(threadId, message) {
  console.log(`adding new message to thread: ${threadId}`);
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

//create run
async function runAssistant(threadId) {
  const response = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  console.log("runAssistant response", response);
  return response;
}

async function checkingStatus(res, threadId, runId) {
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;
  console.log(runObject);
  console.log("Current status: " + status);

  if (status == "completed") {
    clearInterval(pollingInterval);

    const messagesList = await openai.beta.threads.messages.list(threadId);
    let messages = [];

    messagesList.body.data.forEach((message) => {
      messages.push(message.content);
    });

    res.json({ messages });
  }
}

//create new thread
app.get("/thread", (req, res) => {
  createThread().then((thread) => {
    res.json({ threadId: thread.id });
  });
});

//route for adding a message
app.post("/message", (req, res) => {
  const { message, threadId } = req.body;
  addMessage(threadId, message).then((message) => {
    // Run the assistant
    runAssistant(threadId).then((run) => {
      const runId = run.id;

      // Check the status
      pollingInterval = setInterval(() => {
        checkingStatus(res, threadId, runId);
      }, 5000);
    });
  });
});
