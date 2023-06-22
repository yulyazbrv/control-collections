import { postHelper } from "../../helpers/apiHelper";

export const addCollection = async (email, name, description, theme) => {
  const response = await postHelper("/addCollection", {email, name, description, theme });
  return response;
};
