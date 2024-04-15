import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./db/jobs.js";
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
    company: (job, _args, context) => context.companyLoader.load(job.companyId),
  },

  Company: {
    title: (company) => company.name,
    jobs: (company) => getJobsByCompany(company.id),
  },

  Mutation: {
    createAJob: (_, { input }, context) => {
      if (!context.user) {
        onUnauthorized("You not authorized to create a job.");
      }
      const { companyId } = context.user;
      return createJob({ companyId, ...input });
    },

    updateAJob: async (_, { input }, context) => {
      const { user } = context;
      if (!user) {
        onUnauthorized("You not authorized to update a job.");
      }

      const job = await updateJob({ ...input, companyId: user.companyId });

      if (!job) {
        onNotFoundError(`Job with id: ${input.id} was not found.`);
      }
      return job;
    },

    deleteAJob: async (_, { id }, context) => {
      const { user } = context;
      if (!user) {
        onUnauthorized("You not authorized to delete a job.");
      }

      const job = await deleteJob(id, user.companyId);

      if (!job) {
        onNotFoundError(`Job with id: ${id} was not found.`);
      }
      return job;
    },
  },
};

function onNotFoundError(message) {
  throw new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}

function onUnauthorized(message) {
  throw new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}
