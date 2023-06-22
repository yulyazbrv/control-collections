import { postHelper } from "../helpers/apiHelper";

export const addCollection = async (name, decs, theme) => {
  const response = await postHelper("/addCollection", { name, decs, theme });
  return response;
};
