import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  concat,
  ApolloLink,
} from "@apollo/client";

import { getAccessToken } from "../lib/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: "Bearer " + accessToken,
      },
    }));
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, httpLink),
});

const jobDetailsFragment = gql`
  fragment jobDetails on Job {
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
`;

export const getSingleJobQuery = gql`
  query getSingleJobQuery($id: ID!) {
    job: job(id: $id) {
      ...jobDetails
    }
  }
  ${jobDetailsFragment}
`;

export const fetchJobsQuery = gql`
  query getJobsQuery($limit: Int, $offset: Int) {
    jobs: jobs(limit: $limit, offset: $offset) {
      items {
        ...jobDetails
      }
      totalCount
    }
  }
  ${jobDetailsFragment}
`;

export const getACompanyQuery = gql`
  query getACompany($id: ID!) {
    company: company(id: $id) {
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

export const createJobMutationQuery = gql`
  mutation createAJob($input: CreateAJobInput!) {
    job: createAJob(input: $input) {
      ...jobDetails
    }
  }
  ${jobDetailsFragment}
`;
