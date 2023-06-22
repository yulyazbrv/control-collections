import axios from "axios";
import { API_URL } from "../../helpers/apiHelper";

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response;
  } catch (e) {
    console.log(e.response?.message);
  }
};
