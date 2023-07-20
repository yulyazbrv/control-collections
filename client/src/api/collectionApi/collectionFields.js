import { getHelper } from "../../helpers/apiHelper";

export const getCollectionFields = async (id) => {
  const response = await getHelper(`/getCollectionFields?id=${id}`);
  return response;
};
