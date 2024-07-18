import {useState, useEffect, useReducer} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {useLoader} from './modal';

const reducer = (x: number) => x + 1;

type UseAsyncReturn = {
  value: any;
  error: any;
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
};

export type UseAsyncConfig = {
  name?:string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  deps?: any[];
  args?: any[];
  loader?: 'GLOBAL' | 'LOCAL' | 'NONE';
  updateOnFocus?: boolean;
};

function useAsync(
  action: (...args: any[]) => Promise<any>,
  config?: UseAsyncConfig,
): UseAsyncReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<any>();
  const focusState = useIsFocused();
  const globalLoader = useLoader();

  const [re, refetch] = useReducer(reducer, 0);

  // By default, we use the global state loader
  const {
    onSuccess,
    onError,
    deps = [],
    loader = 'GLOBAL',
    args = [],
    updateOnFocus = false,
  } = config || {};

  // const debouncedDeps = useDebounce(deps);

  const parseData = (res: any) => {

    setError(null);

    setValue(res);

    onSuccess?.(res);

  };

  const parseError = (error: any) => {
    setValue(null);
    if (error?.response?.data) {
      setError(error.response.data);
      onError?.(error.response.data);
      return;
    }
    setError(error);
    onError?.(error);
  };

  const startLoaders = () => {
    // use local loader for custom page loaders
    setIsLoading(loader === 'LOCAL');
    if (loader === 'GLOBAL') {
      globalLoader.start();
    }
  };

  const endLoaders = () => {
    setIsLoading(false);
    if (loader === 'GLOBAL') {
      globalLoader.stop();
    }
  };


  useEffect(() => {
    if ((updateOnFocus && focusState) || !updateOnFocus) {
      startLoaders();
      // Start api call
   
      action(...args)
        .then(res => {
          if (typeof res?.json == 'function') {
            return res.json();
          }
 
          return res;
        })
        .then(parseData)
        .catch(parseError)
        .finally(endLoaders);
    }
  }, [...deps, re, ...(updateOnFocus? [focusState]: [])]);

  return {
    value,
    error,
    isLoading,
    refetch,
    isError: error !== null,
  };
}

type UseDelayedAsyncReturn = {
  start: () => UseAsyncReturn;
};

function useDelayedAsync<T>(
  action: () => Promise<T>,
  config?: UseAsyncConfig,
): UseDelayedAsyncReturn {
  const start = () => useAsync(action, config);

  return {start};
}

export {
  useAsync,
  useDelayedAsync,
  type UseAsyncReturn,
  type UseDelayedAsyncReturn,
};
