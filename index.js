const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const topicRoutes = require("./routes/reviewquestions");
const { PORT } = process.env;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/topic", topicRoutes);

//Listening
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
