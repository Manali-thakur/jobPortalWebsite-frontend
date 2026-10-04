import express from "express";
import JobController from "../controller/job.controller.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const jobRouter = express.Router();
const jobController = new JobController();

// /jobs

jobRouter.get("/jobs/new", auth, jobController.getNewJob); // must stay above /jobs/:id
jobRouter.get("/jobs", jobController.getJobs);
jobRouter.post("/jobs", auth, upload.single("logo"), jobController.postNewJob);
jobRouter.get("/jobs/:id", jobController.getJobDetails);

// /jobs/:id/update
jobRouter.get("/jobs/:id/update", auth, jobController.getUpdateJob);
jobRouter.post("/jobs/:id/update", auth, upload.single("logo"), jobController.postUpdateJob);

// /jobs/:id/delete
jobRouter.get("/jobs/:id/delete", auth, jobController.deleteJob);
jobRouter.post("/jobs/:id/delete", auth, jobController.deleteJob);

// /jobs/:id/applicants
jobRouter.get("/jobs/:id/applicants", auth, jobController.getApplicants);
jobRouter.post(
  "/jobs/:id/applicants/:applicantId/update",
  auth,
  jobController.postUpdateApplicant,
);
jobRouter.post(
  "/jobs/:id/applicants/:applicantId/delete",
  auth,
  jobController.deleteApplicant,
);
jobRouter.post("/jobs/:id/applicants", upload.single("resume"), jobController.applyToJob);

// /apply/:id
jobRouter.post("/apply/:id", upload.single("resume"), jobController.applyToJob);

// /404
// jobRouter.get("/404", (req, res) => res.status(404).render("404"));

export default jobRouter;
