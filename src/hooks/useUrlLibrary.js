import { useCallback, useEffect, useState } from "react";
import { urlService } from "../services/urlService";

export function useUrlLibrary(initialParams = {}) {
  const paramsKey = JSON.stringify(initialParams);
  const [data, setData] = useState({
    content: [],
    page: 0,
    size: initialParams.size || 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUrls = useCallback(async (params = initialParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await urlService.listMine(params);
      setData(response.data);
      return response.data;
    } catch (fetchError) {
      setError(fetchError);
      throw fetchError;
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    fetchUrls(initialParams).catch(() => {});
  }, [paramsKey]);

  return { data, loading, error, fetchUrls, setData };
}
