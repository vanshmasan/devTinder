const express = require("express");
const app = express();

app.get(
  "/user/:userId",
  (req, res, next) => {
    console.log(req.param);
    console.log("First middleware");
    //res.send("vansh masan 1");
    next();
  },
  (req, res, next) => {
    console.log("Second middleware");
    //res.send("vansh masan 2");
    next();
  },
  (req, res) => {
    console.log("third middleware");
    res.send("vansh masan 3");
  }
);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
