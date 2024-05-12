import { instance } from ".";
import axios from "axios";

export const githubLogin = async (code) => {
  const response = await instance.post("/user/login", { code });
  const accessToken = response.headers.get("Authorization");
  const token = accessToken.replace("Bearer ", "");
  sessionStorage.setItem("accessToken", token);
  return response.data;
};

export const fetchRepos = async ({ login }) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await axios.get(`https://api.github.com/user/repos`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    params: {
      sort: "updated",
    },
  });
  return response.data.filter((repo) => repo.owner.login === login);
};
