const express = require("express");
const app = express();

app.post("/user", (req, res) => {
  res.send("hello ");
});
app.use("/user", (req, res) => {
  res.send("hello  dashboard");
});
app.get("/user", (req, res) => {
  res.send({ firstname: "vansh", lastname: "masan", age: "22" });
});
app.delete("/user", (req, res) => {
  res.send("user deleted");
});
// app.use("/", (req, res) => {
//   res.send("hello  dashboard");
// });

app.listen(3000, () => {
  console.log("server started at port 3000");
});
