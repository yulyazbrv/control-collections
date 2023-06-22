import { postHelper } from "../helpers/apiHelper";

export const addTag = async (nameItem, tag) => {
  const response = await postHelper("/addTag", { nameItem, tag });
  return response;
};
