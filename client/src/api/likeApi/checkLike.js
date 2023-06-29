import { getHelper } from "../../helpers/apiHelper";

export const checkLike = async (email, id) => {
  const response = await getHelper(`/checkLike?email=${email}&id=${id}`);
  return response;
};