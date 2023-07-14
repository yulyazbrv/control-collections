import { useQuery } from "react-query";
import { getUserCollections } from "../api/collectionApi/userCollections";

export const useUserCollections = (email) => {
  const queryKey = ["getUserCollections", email];
  return useQuery(
    queryKey,
    async () => {
      const collections = await getUserCollections(email);
      return collections;
    },
    { enabled: !!email }
  );
};
