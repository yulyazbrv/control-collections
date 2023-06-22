import { getHelper } from "../../helpers/apiHelper";

export const getUserCollections = async (email) => {
  const response = await getHelper(`/getUserCollections?email=${email}`);
  return response;
};
