import { useQuery } from "@apollo/client";
import { fetchJobsQuery } from "../queries";

export function useFetchJobsQuery(limit, offset) {
  return useQuery(fetchJobsQuery, {
    fetchPolicy: "network-only",
    variables: {
      limit,
      offset,
    },
  });
}
