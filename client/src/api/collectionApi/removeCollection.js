import { deleteHelper } from "../../helpers/apiHelper";

export const removeCollection = async (id) => {
  const response = await deleteHelper("/deleteCollection", { id });
  return response;
};
