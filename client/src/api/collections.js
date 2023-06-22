import { getHelper } from "../helpers/apiHelper";

export const getCollections = async () => {
  const response = await getHelper("/getCollections");
  return response;
};
