import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getACompany } from "../graphql/queries";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getACompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) return <p>Loading...</p>;
  console.log({ companyId });
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
