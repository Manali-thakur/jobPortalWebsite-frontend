import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// const uploadsDirectory = path.resolve(
//   path.dirname(fileURLToPath(import.meta.url)),
//   "../../uploads",
// );
const uploadsDirectory = process.env.VERCEL
  ? "/tmp"
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../uploads");

mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename(req, file, callback) {
    callback(
      null,
      `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`,
    );
  },
});

const upload = multer({ storage });

const resumeUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    if (extension !== ".pdf" || file.mimetype !== "application/pdf") {
      return callback(new Error("Resume must be a PDF file."));
    }
    callback(null, true);
  },
}).single("resume");

export function uploadResume(req, res, next) {
  resumeUpload(req, res, async (error) => {
    if (error) {
      const message =
        error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
          ? "Resume must be 5 MB or smaller."
          : error.message;
      return res.status(400).type("text").send(message);
    }

    if (!req.file) {
      return res
        .status(400)
        .type("text")
        .send("Please upload your resume as a PDF.");
    }

    let fileContents;
    try {
      fileContents = await readFile(req.file.path);
    } catch (readError) {
      return next(readError);
    }

    if (!fileContents.subarray(0, 1024).includes(Buffer.from("%PDF-"))) {
      try {
        await unlink(req.file.path);
      } catch (unlinkError) {
        return next(unlinkError);
      }
      return res
        .status(400)
        .type("text")
        .send("The uploaded file is not a valid PDF.");
    }

    next();
  });
}

export default upload;
