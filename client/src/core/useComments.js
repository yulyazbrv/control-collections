import { useQuery } from "react-query";
import { getComments } from "../api/commentApi/comments";
import { useEffect } from "react";

export const useComments = (id) => {
  const queryKey = ["getComments", id];
  

  const { data, isLoading, refetch } = useQuery(
    queryKey,
    async () => {
      const comments = await getComments(id);
      return comments;
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );


  return { data, isLoading, refetch };
};
