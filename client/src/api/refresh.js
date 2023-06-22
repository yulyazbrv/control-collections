import { getHelper } from "../helpers/apiHelper";

export const refresh = async (refreshToken) => {
  const response = await getHelper(`/refresh?refreshToken=${refreshToken}`);
  return response;
};
