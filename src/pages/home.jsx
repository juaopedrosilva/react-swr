import { useSearchParams } from 'react-router-dom';
import { useInfinite } from '../hooks/useInfinite';

export default function Home() {
  const getKey = (pageIndex, previousPageData, repo, pageSize) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `repos/${repo}/issues?per_page=${pageSize}&page=${pageIndex + 1}`;
  };

  const [searchParams] = useSearchParams();

  const { data, error } = useInfinite((...args) =>
    getKey(...args, searchParams.get('repo'), 10)
  );

  console.log(error?.response);

  return <pre>{JSON.stringify(data)}</pre>;
}
