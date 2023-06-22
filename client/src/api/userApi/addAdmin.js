import { putHelper } from "../../helpers/apiHelper";

export const addAdmin = async (email) => {
  const response = await putHelper("/addAdmin", { email });
  return response;
};
