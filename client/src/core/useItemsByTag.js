import { useQuery } from "react-query";
import { getItemsByTag } from "../api/itemApi/itemsByTag";

export const useItemsByTag = (tag) => {
  const queryKey = ["getItemsByTag", tag];
  return useQuery(queryKey, async () => {
    const items = await getItemsByTag(tag);
    return items;
  });
};
