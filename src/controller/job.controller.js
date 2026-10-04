import JobModel from "../model/job.model.js";

export default class JobController {
  getJobs(req, res) {
    res.render("list-all-jobs", { jobs: JobModel.allJobs() });
  }

  getJobDetails(req, res) {
    const job = JobModel.findJobById(req.params.id);
    if (!job) return res.status(404).render("404");
    res.render("job-details", { job });
  }

  getNewJob(req, res) {
    res.render("new-job");
  }

  postNewJob(req, res) {
    const {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;

    JobModel.addJob(
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    );
    res.redirect("/jobs");
  }

  getUpdateJob(req, res) {
    const job = JobModel.findJobById(req.params.id);
    if (!job) return res.status(404).render("404");
    res.render("update-job", { job });
  }

  postUpdateJob(req, res) {
    const {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;

    const job = JobModel.updateJob(
      req.params.id,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
    );

    if (!job) return res.status(404).render("404");
    res.redirect(`/jobs/${job.id}`);
  }

  deleteJob(req, res) {
    const deleted = JobModel.deleteJob(req.params.id);
    if (!deleted) return res.status(404).render("404");
    res.redirect("/jobs");
  }

  applyToJob(req, res) {
    const { name, email, contact } = req.body;
    const applicant = JobModel.addApplicant(
      req.params.id,
      name,
      email,
      contact,
      "",
    );
    if (!applicant) return res.status(404).render("404");
    res.redirect(`/jobs/${req.params.id}`);
  }

  getApplicants(req, res) {
    const job = JobModel.findJobById(req.params.id);
    if (!job) return res.status(404).render("404");
    res.render("all-applicants", { job });
  }
}
