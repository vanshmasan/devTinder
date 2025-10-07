const express = require("express");
const connectDb = require("./config/database");
const User = require("./model/user");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user registered successfully");
  } catch (err) {
    res.status(400).send("error in registering user");
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
  const { userId, data } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
    console.log("✅ Updated user:", user);
  } catch (err) {
    console.error("❌ Error updating user:", err);
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
