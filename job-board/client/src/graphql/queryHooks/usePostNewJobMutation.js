import { useMutation } from "@apollo/client";
import { createJobMutationQuery, getSingleJobQuery } from "../queries";

export function usePostNewJobMutation() {
  const [mutate, { loading, error }] = useMutation(createJobMutationQuery);

  async function createJob(title, description) {
    const {
      data: { job },
    } = await mutate({
      variables: {
        input: {
          title,
          description,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: getSingleJobQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  }

  return { createJob, loading, error };
}
