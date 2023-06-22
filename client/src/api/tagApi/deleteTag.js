import { deleteHelper } from "../../helpers/apiHelper";

export const deleteTag = async (nameItem, tag) => {
  const response = await deleteHelper("/deleteTag", { nameItem, tag });
  return response;
};
