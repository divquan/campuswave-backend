import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs";

export const upload = (req, res) => {
  if (!req.files) return res.status(400).send("No file uploaded");
  //accssing the file
  let imageFile = req.files.file;
  let uploadPath = process.cwd() + "/uploads/" + imageFile.name;
  //Use the mv() method to place the file somewhere on your server

  imageFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    uploadImage(uploadPath)
      .then((url) => {
        //send url to client
        res.send(url).status(200);
      })
      .then(() => {
        //delete file after uploading to cloudinary
        fs.unlinkSync(uploadPath);
      });
  });
};
