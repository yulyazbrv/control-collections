import { postHelper } from "../../helpers/apiHelper";

export const addLike = async (email, nameItem) => {
  const response = await postHelper("/addLike", { email, nameItem });
  return response;
};
