import useSWRInfinite from 'swr/infinite';

import API from '../services/api';

export function useInfinite(getKey, config) {
  const {
    data: response,
    error,
    size,
    isValidating,
    setSize,
  } = useSWRInfinite(
    getKey,
    async (url) => {
      const { data } = await API.get(url);

      return data;
    },
    config
  );

  const data = response ? [].concat(...response) : [];
  const isLoadingInitialData = !response && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && response && typeof response[size - 1] === 'undefined');
  const isEmpty = response?.[0]?.length === 0;
  const isRefreshing = isValidating && response && response.length === size;

  return {
    data,
    error,
    size,
    setSize,

    isLoadingInitialData,
    isLoadingMore,
    isRefreshing,
    isEmpty,
  };
}
