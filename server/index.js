require("dotenv").config();

const express = require("express");

const { connectToMongoDB } = require("./datasbase");
const path = require("path");

const app = express();
/* Middleware for reading the request body */
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const router = require("./routes");

app.use("/api", router);

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listerning on http://localhost:${port}`);
  });
}

startServer();
