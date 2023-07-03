import { useQuery } from "react-query";
import { getTags } from "../api/tagApi/tags";

export const useTags = () => {
  return useQuery("/getTags", async () => {
    const tags = await getTags();
    return tags;
  });
};
