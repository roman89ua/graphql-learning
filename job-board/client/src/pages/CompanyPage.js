import { useParams } from "react-router";

import JobList from "../components/JobList";
import { useCompanyByIdQuery } from "../graphql/queryHooks/useCompanyByIdQuery";

function CompanyPage() {
  const { companyId } = useParams();

  const { data, error, loading } = useCompanyByIdQuery(companyId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { company } = data;
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      {!!company?.jobs && (
        <>
          <h1 className="title is-2">Company jobs available</h1>
          <JobList jobs={company.jobs} />
        </>
      )}
    </div>
  );
}

export default CompanyPage;
