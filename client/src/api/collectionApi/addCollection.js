import { postHelper } from "../../helpers/apiHelper";

export const addCollection = async (email, name, description, theme, image, customFields) => {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("name", name);
  formData.set("description", description);
  formData.set("theme", theme);
  formData.set("image", image);
  formData.set("customFields", JSON.stringify(customFields));

  const response = await postHelper("/addCollection", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`upload process: ${percentCompleted}%`);
    },
  });
  return response;
};
