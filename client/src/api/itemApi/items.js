import { getHelper } from "../../helpers/apiHelper";

export const getItems = async () => {
  const response = await getHelper("/getItems");
  return response;
};
