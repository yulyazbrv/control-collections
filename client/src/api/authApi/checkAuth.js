import axios from "axios";
import { API_URL } from "../../helpers/apiHelper";

export const refreshAuthLogic = (failedRequest) =>
  axios.get(`${API_URL}/refresh`).then((tokenRefreshResponse) => {
    localStorage.setItem("token", tokenRefreshResponse.data.token);
    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + tokenRefreshResponse.data.token;
    return Promise.resolve();
  });
