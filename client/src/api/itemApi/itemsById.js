import { getHelper } from "../../helpers/apiHelper";

export const getItemsById = async (id) => {
  const response = await getHelper(`/getItemsById?id=${id}`);
  return response;
};