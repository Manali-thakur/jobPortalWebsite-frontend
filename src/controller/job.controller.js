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
      job_category: jobcategory,
      job_designation: jobdesignation,
      job_location: joblocation,
      company_name: companyname,
      salary,
    } = req.body;
    const skillsrequired = req.body.skills_required;

    JobModel.addJob(
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      req.body.apply_by,
      skillsrequired,
      req.body.number_of_openings,
      {
        experience: req.body.experience,
        companyFounded: req.body.company_founded,
        employees: req.body.employees,
        logo: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
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
      job_category: jobcategory,
      job_designation: jobdesignation,
      job_location: joblocation,
      company_name: companyname,
      salary,
    } = req.body;
    const existingJob = JobModel.findJobById(req.params.id);
    if (!existingJob) return res.status(404).render("404");

    const job = JobModel.updateJob(
      req.params.id,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      req.body.apply_by,
      req.body.skills_required,
      req.body.number_of_openings,
      {
        experience: req.body.experience,
        companyFounded: req.body.company_founded,
        employees: req.body.employees,
        logo: req.file ? `/uploads/${req.file.filename}` : existingJob.logo,
      },
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
      req.file ? req.file.filename : "",
    );
    if (!applicant) return res.status(404).render("404");
    res.redirect(`/jobs/${req.params.id}`);
  }

  getApplicants(req, res) {
    const job = JobModel.findJobById(req.params.id);
    if (!job) return res.status(404).render("404");
    res.render("all-applicants", { allApplicants: job.applicants, job });
  }
}
