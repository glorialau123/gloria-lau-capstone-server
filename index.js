require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { PORT } = process.env;

const topicRoutes = require("./routes/questionsroute");
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
