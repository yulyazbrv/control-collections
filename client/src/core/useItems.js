import { useQuery } from "react-query";
import { getItems } from "../api/itemApi/items";

export const useItems = () => {
  return useQuery("/getItems", async () => {
    const items = await getItems();
    return items;
  });
};
