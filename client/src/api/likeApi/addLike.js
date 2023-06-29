import { postHelper } from "../../helpers/apiHelper";

export const addLike = async (email, id) => {
  const response = await postHelper("/addLike", { email, id });
  return response;
};
