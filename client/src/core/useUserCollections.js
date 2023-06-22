import { useQuery } from "react-query";
import { getUserCollections } from "../api/userCollections";

export const useUserCollections = (email) => {
  return useQuery("/getUserCollections", async () => {
    const collections = await getUserCollections(email);
    return collections;
  });
};
