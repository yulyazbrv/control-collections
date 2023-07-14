import { useQuery } from "react-query";
import { getItemsById } from "../api/itemApi/itemsById";

export const useItemsById = (id) => {
  const queryKey = ["getItemsById", id];
  return useQuery(queryKey, async () => {
    const items = await getItemsById(id);
    return items;
  }, {enabled: !!id});
};
