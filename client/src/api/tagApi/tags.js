import { getHelper } from "../../helpers/apiHelper";

export const getTags = async () => {
  const response = await getHelper("/getTags");
  return response;
};
