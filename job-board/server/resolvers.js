import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: async (_, args) => {
      const job = await getJob(args.id);
      if (!job) {
        onNotFoundError("No job found with id: " + args.id + ".");
      }
      return job;
    },

    company: async (_, args) => {
      const company = await getCompany(args.id);

      if (!company) {
        onNotFoundError(`Company with id: ${args.id} not exist.`);
      }

      return company;
    },
  },

  Job: {
    date: (job) => job.createdAt,
    company: (job) => getCompany(job.companyId),
  },

  Company: {
    title: (company) => company.name,
    jobs: (company) => getJobsByCompany(company.id),
  },
};

function onNotFoundError(message) {
  throw new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
