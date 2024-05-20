import { instance } from ".";

export const createProject = async (data) => {
  const response = await instance.post("/project/create", data);
  return response.data;
};

export const fetchProjects = async () => {
  // 쿼리 키: ["/projects", user.login]
  const response = await instance.get("/project/");
  return response.data;
};
