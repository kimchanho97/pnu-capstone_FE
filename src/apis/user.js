import { instance } from ".";

export const githubLogin = async (code) => {
  const response = await instance.post("/user/login", { code });
  return response.data;
};
