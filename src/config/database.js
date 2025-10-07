const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vanshmasan:2CnAaQT8TgEmpICd@vanshmasan.hdtaysk.mongodb.net/devtinder?retryWrites=true&w=majority"
    );
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    throw error;
  }
};

module.exports = connectDb;
