import { putHelper } from "../../helpers/apiHelper";

export const unblockUser = async (emailArray) => {
  if (emailArray) {
    const responses = emailArray.map((email) => {
      return putHelper("/unblock", { email });
    });
    Promise.all(responses);
  } else {
    console.log("emailArray is empty");
  }
};
