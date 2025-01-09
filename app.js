require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user route middleware file
const questionRoutes = require("./routes/questionRoute");
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data from request body
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select  'test' ");
    await app.listen(port);
    console.log("Server is running on port", port);
  } catch (err) {
    console.error(err.message);
  }
}

start();
