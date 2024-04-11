import { gql, GraphQLClient } from "graphql-request";
import { getAccessToken } from "../lib/auth";

const client = new GraphQLClient("http://localhost:9000/graphql", {
  headers: () => {
    const accessToken = getAccessToken();

    return accessToken ? { Authorization: "Bearer " + accessToken } : {};
  },
});

export const fetchJobs = async () => {
  const document = gql`
    query getJibsQuery {
      jobs {
        id
        title
        description
        date

        company {
          id
          name
          description
          title
        }
      }
    }
  `;

  const { jobs } = await client.request(document);
  return jobs;
};

export async function getAJob(id) {
  const document = gql`
    query getSingleJobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        date

        company {
          id
          name
          description
          title
        }
      }
    }
  `;
  const { job } = await client.request(document, { id });
  return job;
}

export async function getACompany(id) {
  const document = gql`
    query getACompany($id: ID!) {
      company(id: $id) {
        id
        name
        description
        title

        jobs {
          id
          title
          description
          date
        }
      }
    }
  `;

  const { company } = await client.request(document, { id });

  return company;
}

export async function createAJob(input) {
  const document = gql`
    mutation createAJob($input: CreateAJobInput!) {
      job: createAJob(input: $input) {
        id
      }
    }
  `;

  const { job } = await client.request(document, { input });

  return job;
}
