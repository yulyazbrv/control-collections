import { postHelper } from "../../helpers/apiHelper";

export const addItem = async (name, idCollection) => {
  const response = await postHelper("/addItem", { name, idCollection });
  return response;
};
