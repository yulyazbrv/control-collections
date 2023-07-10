import { useQuery } from "react-query";
import { getFullSearch } from "../api/collectionApi/fullSearch";

export const useSearch = (searchText) => {
  const queryKey = ["getFullSearch", searchText];
  return useQuery(queryKey, async () => {
    const ids = await getFullSearch(searchText);
    return ids;
  });
};