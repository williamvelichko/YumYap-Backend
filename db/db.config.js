const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const url = process.env.DB_URL; // Change this to your MongoDB connection string
const dbName = process.env.DB_NAME; // Change this to your database name
console.log(url, dbName);
let client;

async function connectDB() {
  try {
    client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDB() {
  return client.db(dbName);
}

function closeDB() {
  client.close();
}

module.exports = { connectDB, getDB, closeDB };
