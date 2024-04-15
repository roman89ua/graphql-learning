import JobList from "../components/JobList";

import { useFetchJobsQuery } from "../graphql/queryHooks/useFetchJobsQuery";

function HomePage() {
  const { data, loading, error } = useFetchJobsQuery();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  const { jobs } = data;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
