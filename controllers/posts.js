import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err).status(404);
    res.json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated");

  jwt.verify(token, "holy#$", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.url ||
      !req.body.category
    )
      return res.status(400).json("Missing fields");
    if (!req.body.category) return res.status(400).json("Missing category");

    const q =
      "INSERT INTO posts(`title`, `description`,  `category`, `uid`, `img`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.description,
      req.body.category,
      userInfo.id,
      req.body.url,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err).status(404);
      return res.status(200).json("Post successfully created");
    });
  });
};

export const editPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated");

  jwt.verify(token, "holy#$", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE posts SET `title`=?,`description`=?,`category`=? WHERE `id` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.category,
      userInfo.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.json(err).status(404);
      return res.status(200).json("Post successfully updated");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated");

  jwt.verify(token, "holy#$", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM posts WHERE id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err).status(404);
      return res.status(200).json("Post successfully deleted");
    });
  });
};
