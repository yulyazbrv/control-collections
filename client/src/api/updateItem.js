import { putHelper } from "../helpers/apiHelper";

export const updateItem = async (id, name, tags) => {
  const response = await putHelper("/updateItem", { id, name, tags });
  return response;
};
