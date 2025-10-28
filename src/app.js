const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
//get user by email

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
