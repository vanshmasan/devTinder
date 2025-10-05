const express = require("express");
const connectDb = require("./config/database");
const User = require("./model/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstname: "shanu",
    lastname: "masan",
    emailId: "shanumasanhnd@gmail.com",
    password: "12456",
  });

  try {
    await user.save();
    res.send("user registered successfully");
  } catch (err) {
    res.status(400).send("error in registering user");
  }
});

connectDb()
  .then(() => {
    console.log("Database connect successfully");

    app.listen(3000, () => {
      console.log("server started at port 3000");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });
