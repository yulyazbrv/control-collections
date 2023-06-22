import { postHelper } from "../../helpers/apiHelper";

export const addComment = async (email, nameItem, text) => {
  const response = await postHelper("/addComment", { email, nameItem, text });
  return response;
};
