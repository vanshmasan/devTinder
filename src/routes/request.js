const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending a connection request");
  res.send(user.firstname + " sent a connect request");
});
module.exports = requestRouter;
