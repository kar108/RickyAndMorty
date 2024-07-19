import {useEffect, useState} from 'react';

export function useDebounce<T>(value: T, setPage: any , delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value), setPage(1);
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

type UsePaginationArgs = {
  page?: number;
  totalCount?: number;
  size?: number;
};

const PAGE_SIZE = 10;

export function usePagination(args?: UsePaginationArgs) {
  const {page: current = 0, totalCount = 0, size = PAGE_SIZE} = args || {};

  const [page, setPage] = useState<number>(current);
  const [count, setCount] = useState<number>(totalCount);

  const nextPage = () => {
    if (page * size < count) {
      setPage(p => p + 1);
    }
  };

  const prevPage = () => {
    setPage(p => p - 1);
  };

  const updateCount = (newCount: number) => {
    if (typeof newCount === 'number') {
      setCount(newCount);
    }
  };

  return {
    page,
    count,
    nextPage,
    prevPage,
    updateCount,
    setPage,
  };
}
