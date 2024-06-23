require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// const { OUT_PORT } = process.env;

const topicRoutes = require("./routes/questionsroute");
const chatbotRoutes = require("./routes/chatbot");
const functions = require("firebase-functions");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/topic", topicRoutes);
app.use("/chatbot", chatbotRoutes);

//Listening
// app.listen(OUT_PORT, () => {
//   console.log("Running on port:", OUT_PORT);
// });

exports.api = functions.https.onRequest(app);
