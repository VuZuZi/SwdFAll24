import express from "express";
import multer from "multer";
import path from "path";
import { storage } from "../config/fireBaseStorage.js";
import { v4 as uuidv4 } from "uuid";

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});
uploadRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    //ger file from request
    const file = req.file;
    //create new filename
    if (file) {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const blob = storage.file(fileName);
      const blodStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      //if error
      blodStream.on("error", (error) => {
        res.status(400).json({ message: error.message });
      });

      //if success
      blodStream.on("finish", () => {
        //get public URL
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
        //Return the filename and its public URL
        res.status(200).json(publicUrl);
      });
      blodStream.end(file.buffer);
    } else {
      res.status(400).json({ message: "Please upload a file" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export default uploadRouter;
