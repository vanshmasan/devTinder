const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://vanshmasan:2CnAaQT8TgEmpICd@vanshmasan.hdtaysk.mongodb.net/devtinder"
  );
};
module.exports = connectDb;
