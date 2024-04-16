import JobList from "../components/JobList";

import { useFetchJobsQuery } from "../graphql/queryHooks/useFetchJobsQuery";
import { useMemo, useState } from "react";
import PaginationBar from "../components/PaginationBar";

const JOB_PER_PAGE_LIMIT = 10;

const DEFAULT_PAGE_NUMBER = 1;

function HomePage() {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);

  const offset = useMemo(
    () => (page - DEFAULT_PAGE_NUMBER) * JOB_PER_PAGE_LIMIT,
    [page],
  );

  const { data, loading, error } = useFetchJobsQuery(
    JOB_PER_PAGE_LIMIT,
    offset,
  );

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  const { items, totalCount } = data.jobs;

  const totalPages = Math.ceil(totalCount / JOB_PER_PAGE_LIMIT);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <JobList jobs={items} />
    </div>
  );
}

export default HomePage;
