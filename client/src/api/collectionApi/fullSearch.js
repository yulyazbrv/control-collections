import { getHelper } from "../../helpers/apiHelper";

export const getFullSearch = async (searchText) => {
  const response = await getHelper(`/getFullSearch?searchText=${searchText}`);
  return response;
};