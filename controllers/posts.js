import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};
export const getPost = (req, res) => {};
export const addPost = (req, res) => {};
export const editPost = (req, res) => {};
export const deletePost = (req, res) => {};
