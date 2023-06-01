import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => res.status(200).send("OK"));
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);
app.listen(10000, () => console.log("Connected"));
