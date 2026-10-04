export const jobs = [];

export default class JobModel {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    details = {},
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = Array.isArray(skillsrequired)
      ? skillsrequired
      : String(skillsrequired || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    this.numberofopenings = numberofopenings;
    this.experience = details.experience || "";
    this.companyFounded = details.companyFounded || "";
    this.employees = details.employees || "";
    this.logo = details.logo || "/images/logo.png";
    this.companyDescription = details.companyDescription || "";
    this.jobposted = new Date();
    this.applicants = [];
    this.nextApplicantId = 1;
  }

  static allJobs() {
    return jobs;
  }

  static addJob(
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    details = {},
  ) {
    const id = jobs.length + 1;
    const newJob = new JobModel(
      id,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      details,
    );
    jobs.push(newJob);
    return newJob;
  }

  static findJobById(id) {
    return jobs.find((job) => job.id === Number(id));
  }

  static updateJob(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    details = {},
  ) {
    const job = JobModel.findJobById(id);
    if (job) {
      job.jobcategory = jobcategory;
      job.jobdesignation = jobdesignation;
      job.joblocation = joblocation;
      job.companyname = companyname;
      job.salary = salary;
      job.applyby = applyby;
      job.skillsrequired = Array.isArray(skillsrequired)
        ? skillsrequired
        : String(skillsrequired || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
      job.numberofopenings = numberofopenings;
      job.experience = details.experience || "";
      job.companyFounded = details.companyFounded || "";
      job.employees = details.employees || "";
      job.companyDescription = details.companyDescription || "";
      if (details.logo) job.logo = details.logo;
    }
    return job;
  }

  static deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === Number(id));
    if (index !== -1) {
      jobs.splice(index, 1);
      return true;
    }
    return false;
  }

  static addApplicant(jobId, name, email, contact, resumePath) {
    const job = JobModel.findJobById(jobId);
    if (!job) return null;
    const applicantId =
      job.nextApplicantId ??
      Math.max(0, ...job.applicants.map((item) => item.id)) + 1;
    job.nextApplicantId = applicantId + 1;
    const applicant = {
      id: applicantId,
      name,
      email,
      contact,
      resumePath,
    };
    job.applicants.push(applicant);
    return applicant;
  }

  static getApplicants(jobId) {
    const job = JobModel.findJobById(jobId);
    return job ? job.applicants : [];
  }

  static updateApplicant(jobId, applicantId, details) {
    const applicant = JobModel.getApplicants(jobId).find(
      (item) => item.id === Number(applicantId),
    );
    if (!applicant) return null;

    applicant.name = details.name;
    applicant.email = details.email;
    applicant.contact = details.contact;
    return applicant;
  }

  static deleteApplicant(jobId, applicantId) {
    const job = JobModel.findJobById(jobId);
    if (!job) return false;

    const index = job.applicants.findIndex(
      (applicant) => applicant.id === Number(applicantId),
    );
    if (index === -1) return false;

    job.applicants.splice(index, 1);
    return true;
  }
}
