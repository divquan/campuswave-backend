import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;
export const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to the database!");

  // Perform database operations here

  //   db.end(); // Close the connection when done
});
