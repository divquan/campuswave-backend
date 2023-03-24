import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

// app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/upload", uploadRoutes);
app.get("/health", (req, res) => res.status(200));

app.listen(10000, () => console.log("Connected"));
