import { putHelper } from "../../helpers/apiHelper";

export const updateCollection = async (id, name, description, theme) => {
  const response = await putHelper("/updateCollection", {
    id,
    name,
    description,
    theme,
  });
  return response;
};
