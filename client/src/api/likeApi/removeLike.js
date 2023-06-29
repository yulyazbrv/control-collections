import { deleteHelper, postHelper } from "../../helpers/apiHelper";

export const removeLike = async (email, id) => {
  const response = await deleteHelper("/removeLike", { email, id });
  return response;
};