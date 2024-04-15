import { useQuery } from "@apollo/client";
import { getSingleJobQuery } from "../queries";

export const useJobBuIdQuery = (jobId) => {
  return useQuery(getSingleJobQuery, {
    variables: { id: jobId },
  });
};
