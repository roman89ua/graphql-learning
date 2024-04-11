import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useCallback, useEffect, useState } from "react";
import { getAJob } from "../graphql/queries";

function JobPage() {
  const { jobId } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    job: null,
    error: null,
  });

  const fetchJob = useCallback(async () => {
    try {
      const job = await getAJob(jobId);
      setState((prevState) => {
        return {
          ...prevState,
          job,
          isLoading: false,
          error: null,
        };
      });
    } catch (e) {
      setState((prevState) => {
        return {
          ...prevState,
          job: null,
          isLoading: false,
          error: e,
        };
      });
    }
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const { error, job, isLoading } = state;

  if (isLoading) {
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
