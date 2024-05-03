const dotenv = require("dotenv").config();
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const mongoose = require("mongoose");

let client;

async function connectDB() {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
function getDB() {
  if (!client) {
    throw new Error("MongoDB connection not established");
  }
  return client.db(dbName);
}

function closeDB() {
  if (client) {
    client.close();
  }
}
module.exports = { connectDB, getDB, closeDB };
