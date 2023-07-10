import { useQuery } from "react-query";
import { getItemsById } from "../api/itemApi/itemsById";

export const useItemsById = (id) => {
  console.log(id)
  const queryKey = ["getItemsById", id];
  return useQuery(queryKey, async () => {
    const items = await getItemsById(id);
    return items;
  });
};
