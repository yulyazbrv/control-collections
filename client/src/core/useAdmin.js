import { useQuery } from "react-query";
import { isAdmin } from "../api/userApi/isAdmin";

export const useAdmin = (email) => {
  const queryKey = ["isAdmin", email];
  return useQuery(
    queryKey,
    async () => {
      const admin = await isAdmin(email);
      return admin;
    },
    { enabled: !!email }
  );
};
