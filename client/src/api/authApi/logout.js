import { postHelper } from "../../helpers/apiHelper";

export const logoutUser = async () => {
  try {
    await postHelper("/logout");
    localStorage.removeItem("token");
  } catch (e) {
    console.log(e.response?.message);
  }
};
