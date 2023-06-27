import { postHelper } from "../../helpers/apiHelper";

export const addComment = async (email, id, text) => {
  const response = await postHelper("/addComment", { email, id, text });
  return response;
};
