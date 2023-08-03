import { getHelper } from "../../helpers/apiHelper";

export const getCollectionById = async (id) => {
  const response = await getHelper(`/getCollectionById?id=${id}`);
  return response;
};
