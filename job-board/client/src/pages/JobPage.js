import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useJobBuIdQuery } from "../graphql/queryHooks/useJobByIdQuery";

function JobPage() {
  const { jobId } = useParams();
  const { data, loading, error } = useJobBuIdQuery(jobId);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
        <p>{error.code}</p>
      </>
    );
  }

  const { job } = data;

  return (
    <div>
      <h1 className="title is-2">{job.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job.date, "long")}
        </div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
