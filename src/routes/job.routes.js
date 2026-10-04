import express from "express";
import JobController from "../controller/job.controller.js";

const jobRouter = express.Router();
const jobController = new JobController();

// /jobs

jobRouter.get("/jobs/new", jobController.getNewJob); // must stay above /jobs/:id
jobRouter.get("/jobs", jobController.getJobs);
jobRouter.post("/jobs", jobController.postNewJob);
jobRouter.get("/jobs/:id", jobController.getJobDetails);

// /jobs/:id/update
jobRouter.get("/jobs/:id/update", jobController.getUpdateJob);
jobRouter.post("/jobs/:id/update", jobController.postUpdateJob);

// /jobs/:id/delete
jobRouter.get("/jobs/:id/delete", jobController.deleteJob);

// /jobs/:id/applicants
jobRouter.get("/jobs/:id/applicants", jobController.getApplicants);
jobRouter.post("/jobs/:id/applicants", jobController.applyToJob);

// /apply/:id
jobRouter.post("/apply/:id", jobController.applyToJob);

// /404
// jobRouter.get("/404", (req, res) => res.status(404).render("404"));

export default jobRouter;
