import { postHelper } from "../../helpers/apiHelper";

export const addItem = async (itemCollection, name, tags) => {
  const response = await postHelper("/addItem", { itemCollection, name, tags });
  return response;
};
