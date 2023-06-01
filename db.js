import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;
export const db = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to database!");
db.end();
