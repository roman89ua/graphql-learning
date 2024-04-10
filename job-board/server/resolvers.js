import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Job: {
    date: (job) => job.createdAt,
    company: (job) => getCompany(job.companyId),
  },
  Company: {
    title: (company) => company.name,
    jobs: (company) => getJobsByCompany(company.id),
  },
  Query: {
    jobs: () => getJobs(),
    job: (_, args) => getJob(args.id),
    company: (_, args) => getCompany(args.id),
  },
};
