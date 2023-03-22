import { db } from "../db.js";

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
  console.log("ure");
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");
  console.log(req.body);
  res.json(req.body, "Done").status(200);

  // jwt.verify(token, "jwtkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

  //   const q =
  //     "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  //   const values = [
  //     req.body.title,
  //     req.body.desc,
  //     req.body.img,
  //     req.body.cat,
  //     req.body.date,
  //     userInfo.id,
  //   ];

  //   // db.query(q, [values], (err, data) => {
  //   //   if (err) return res.status(500).json(err);
  //   //   return res.json("Post has been created.");
  //   // });
  // });
};
export const editPost = (req, res) => {};
export const deletePost = (req, res) => {};
