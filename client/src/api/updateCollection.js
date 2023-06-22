import { putHelper } from "../helpers/apiHelper";

export const updateCollection = async (id, name, decs, theme) => {
  const response = await putHelper("/updateCollection", {
    id,
    name,
    decs,
    theme,
  });
  return response;
};
