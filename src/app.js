const express = require("express");
const app = express();

app.use("/text", (req, res) => {
  res.send("hello from text");
});
app.use("/vansh", (req, res) => {
  res.send("hello from vansh masan");
});
app.use("/", (req, res) => {
  res.send("hello from dashboard");
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
