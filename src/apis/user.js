import { instance } from ".";
import axios from "axios";

export const githubLogin = async (code) => {
  const response = await instance.post("/user/login", { code });
  sessionStorage.setItem("accessToken", response.headers.get("Authorization"));
  return response.data;
};

export const fetchRepos = async ({ login }) => {
  const response = await axios.get(
    `https://api.github.com/users/${login}/repos`,
    {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
      params: {
        sort: "updated",
        type: "all",
      },
    },
  );
  return response.data;
};
