import { useQuery } from "@apollo/client";
import { fetchJobsQuery } from "../queries";

export function useFetchJobsQuery() {
  return useQuery(fetchJobsQuery, {
    fetchPolicy: "network-only",
  });
}
