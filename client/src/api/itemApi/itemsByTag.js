import { getHelper } from "../../helpers/apiHelper";

export const getItemsByTag = async (tag) => {
  const response = await getHelper(`/getItemsByTag?tag=${encodeURIComponent(tag)}`);
  return response;
};
