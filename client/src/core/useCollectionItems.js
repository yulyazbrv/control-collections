import { useQuery } from "react-query";
import { getCollectionItems } from "../api/itemApi/collectionItems";

export const useCollectionItems = (id) => {
  return useQuery(
    "/getUserCollections",
    async () => {
      const items = await getCollectionItems(id);
      return items;
    },
    { enabled: !!id }
  );
};
