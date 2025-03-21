import express from "express";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'body-parser';

import multer, { diskStorage } from 'multer';
import { getAllStore, uploadFile } from "../controllers/auth.controller.js";

const { urlencoded } = pkg;
const user = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

user.use(urlencoded({ extended: true }));
user.use(express.static(resolve(__dirname, 'public')));

var uploader = multer({
    storage: diskStorage({}),
    limits: { fileSize: 5000000 } // Increased file size limit to 5 MB
});

user.post('/upload-file', uploader.single("file"), uploadFile);
user.get("/get-file", getAllStore);

export default user;