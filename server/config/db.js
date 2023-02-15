const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://shakespeare89:procerus@cluster0.ydl6vm7.mongodb.net/clients?retryWrites=true&w=majority"
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
