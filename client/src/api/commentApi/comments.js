import { getHelper } from "../../helpers/apiHelper";

export const getComments = async (id) => {
  const response = await getHelper(`/getComments?id=${id}`);
  return response;
};
