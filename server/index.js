require("dotenv").config();

const express = require("express");

const { connectToMongoDB } = require("./datasbase");
const path = require("path");

const app = express();
/* Middleware for reading the requesst body */
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// app.get ("/hello",(req,res)=>{
//     res.status(200).json({msg:'hello pep'})
// })

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
