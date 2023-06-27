import { useQuery } from "react-query";
import { getComments } from "../api/commentApi/comments";

export const useComments = (id) => {
  return useQuery("/getComments", async () => {
    const comments = await getComments(id);
    return comments;
  });
};
