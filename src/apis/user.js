import { instance } from ".";

export const githubLogin = async (code) => {
  const response = await instance.post("/user/login", { code });
  localStorage.setItem("accessToken", response.headers.get("Authorization"));
  return response.data;
};
