import { putHelper } from "../../helpers/apiHelper";

export const addAdmin = async (emailArray) => {
  if (emailArray) {
    const responses = emailArray.map((email) => {
      return putHelper("/addAdmin", { email });
    });
    Promise.all(responses);
  } else {
    console.log("emailArray is empty");
  }
};
