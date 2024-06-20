import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
      sessionStorage.clear();
      window.location.href = "/login";
    } else if (error.response.status === 500) {
      alert("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
    return Promise.reject(error);
  },
);
