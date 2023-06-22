import { postHelper } from "../../helpers/apiHelper";

export const loginUser = async (email, password) => {
  const response = await postHelper("/login", { email, password });
  localStorage.setItem("token", response.accessToken);
  return response
};
