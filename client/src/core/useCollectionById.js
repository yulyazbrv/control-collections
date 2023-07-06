import { useQuery } from "react-query";
import { getCollectionById } from "../api/collectionApi/collectionById";

export const useCollectionById = (id) => {
  const queryKey = ["getCollectionById", id];
  return useQuery(
    queryKey,
    async () => {
      const collection = await getCollectionById(id);
      return collection;
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );
};
