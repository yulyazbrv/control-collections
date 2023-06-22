import { deleteHelper } from "../helpers/apiHelper";

export const removeItem = async (id) => {
  const response = await deleteHelper("/deleteItem", { id });
  return response;
};
