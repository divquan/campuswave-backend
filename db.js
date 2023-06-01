import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL } = process.env;
export const db = mysql.createPool(DATABASE_URL).promise();

db.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to the database!");

  // Perform database operations here

  connection.release(); // Release the connection when done
});
