import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //checking if user email exists
  const q = "SELECT * FROM users WHERE email=? OR username=?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length) {
      return res.status(409).json("User already exists");
    }
    //hashing a password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users(`username`, `email`,  `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User successfully created");
    });
  });
};

export const login = (req, res) => {
  // check if user exists
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return console.log(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    const isPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPassword) return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "holy#$");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none",
    })
    .sttus(200)
    .json("User successfully logged out");
};

export const editUserInfo = (req, res) => {
  // const token = req.access_token.access_token;
  // if (!token) return res.json("Not authenticated");

  const q = "UPDATE users SET email = ?, username = ?  WHERE id = ?";

  // const q = "UPDATE INTO users(`email`,  `username`) values (?)";
  const values = [req.body.email, req.body.username, req.body.id];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err).status(404);
    return res
      .send("User details updated")
      .status(200)
      .clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
  });
};

export const health = (req, res) => {
  res.status(200).json("Site health check");
};
