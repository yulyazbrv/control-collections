import { getHelper } from "../../helpers/apiHelper";

export const isAdmin = async (email) => {
  const response = await getHelper(`/isAdmin?email=${email}`);
  return response;
};
