import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const uploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../uploads",
);

mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename(req, file, callback) {
    callback(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({ storage });

export default upload;
