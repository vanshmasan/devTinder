const express = require("express");
const connectDb = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    validateSignUpData(req);
    //encrypting password
    const { firstname, lastname, emailId, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(passwordhash);
    const user = new User({
      firstname,
      lastname,
      emailId,
      password: passwordhash,
    });
    await user.save();
    res.send("user registered successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid emailid");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("error in fetching user");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("error in fetching users");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("error in deleting user");
  }
});
app.patch("/user", async (req, res) => {
  console.log("Request body:", req.body);

  const { userId } = req.body;
  //   console.log("Data updated:", data);
  console.log("UserId to update:", userId);
  // Debugging line to check the request body
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully" + user);
    console.log("Updated user:", user);
  } catch (err) {
    console.error(" Error updating user:", err);
    res.status(400).send("Error in updating user");
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
