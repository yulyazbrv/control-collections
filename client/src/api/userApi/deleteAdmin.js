import { putHelper } from "../../helpers/apiHelper";

export const deleteAdmin = async (emailArray) => {
  if (emailArray) {
    const responses = emailArray.map((email) => {
      return putHelper("/removeAdmin", { email });
    });
    Promise.all(responses);
  } else {
    console.log("emailArray is empty");
  }
};
