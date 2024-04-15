import { useQuery } from "@apollo/client";
import { getACompanyQuery } from "../queries";

export function useCompanyByIdQuery(companyId) {
  return useQuery(getACompanyQuery, {
    variables: { id: companyId },
  });
}
