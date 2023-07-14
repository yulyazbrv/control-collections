import { deleteHelper } from "../../helpers/apiHelper";

export const deleteUser = async (emailArray) => {
  if (emailArray) {
    const responses = emailArray.map((email) => {
      return deleteHelper("/deleteUser", { email });
    });
    Promise.all(responses);
  } else {
    console.log("emailArray is empty");
  }
};
