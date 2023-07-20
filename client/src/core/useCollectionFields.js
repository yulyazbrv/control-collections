import { useQuery } from "react-query";
import { getCollectionFields } from "../api/collectionApi/collectionFields";

export const useCollectionFields = (id) => {
  const queryKey = ["getCollectionFields", id];
  return useQuery(
    queryKey,
    async () => {
      const collection = await getCollectionFields(id);
      return collection;
    },
    {
      enabled: !!id,
    }
  );
};
