import { useState } from 'react';

interface UseFetchLoading<T> {
  (a: (b: any) => T): [boolean, (c: any) => T];
}

const useFetchLoading: UseFetchLoading<Promise<void>> = func => {
  const [loading, setLoading] = useState<boolean>(false);

  const funcWithLoading: (p: any) => Promise<any> = async (params: any) => {
    setLoading(true);
    await func(params);
    setLoading(false);
  };

  return [loading, funcWithLoading];
};

export default useFetchLoading;
