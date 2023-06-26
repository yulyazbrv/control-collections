import { getHelper } from "../../helpers/apiHelper";

export const getCollectionItems = async (id) => {
  const response = await getHelper(`/getCollectionItems?_id=${id}`);
  return response;
};
