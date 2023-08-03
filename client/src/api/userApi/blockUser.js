import { putHelper } from "../../helpers/apiHelper";

export const blockUser = async (emailArray) => {
  if (emailArray) {
    const responses = emailArray.map((email) => {
      return putHelper("/block", { email });
    });
    Promise.all(responses);
  } else {
    console.log("emailArray is empty");
  }
};
