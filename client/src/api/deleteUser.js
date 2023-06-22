import { deleteHelper } from "../helpers/apiHelper";

export const deleteAdmin = async (email) => {
  const response = await deleteHelper("/deleteUser", { email });
  return response;
};
