import { instance } from ".";

export const fetchProjects = async () => {
  // 쿼리 키: ["/projects", user.login]
  const response = await instance.get("/project/");
  return response.data;
};

export const fetchProjectDetail = async (id) => {
  // 쿼리 키: ["/project", project.id]
  const response = await instance.get(`/project/${id}`);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await instance.delete(`/project/${id}`);
  return response.data;
};

export const checkSubdomain = async (subdomain) => {
  const response = await instance.get(
    `/project/subdomain/check?name=${subdomain}`,
  );
  return response.data;
};

export const createProject = async (data) => {
  const response = await instance.post("/project/create", data, {
    timeout: 30 * 1000,
  });
  return response.data;
};

export const buildProject = async (id) => {
  const response = await instance.post(`/project/build`, { id });
  return response.data;
};

export const deployProject = async (id) => {
  const response = await instance.post(`/project/deploy`, { id });
  return response.data;
};

export const checkProjectDeployStatus = async (id) => {
  const response = await instance.get(`/project/deploy/status?buildId=${id}`);
  return response.data;
};
