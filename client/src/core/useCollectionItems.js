import { useQuery } from "react-query";
import { getCollectionItems } from "../api/itemApi/collectionItems";

export const useCollectionItems = (id) => {
  const queryKey = ["getCollectionItems", id];

  return useQuery(
    queryKey,
    async () => {
      const items = await getCollectionItems(id);
      return items;
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

