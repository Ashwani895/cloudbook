const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectToMongo;
