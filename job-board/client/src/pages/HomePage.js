import JobList from "../components/JobList";
// import { jobs } from "../lib/fake-data";
import { useEffect, useState } from "react";
import { fetchJobs } from "../graphql/queries";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then((jobs) => setJobs(jobs));
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
