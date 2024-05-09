import CircularProgress from "@mui/material/CircularProgress";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { githubLogin } from "../apis/user";
import { userAtom } from "../store";

export default function GithubCallbackPage() {
  const [searchParams] = useSearchParams();
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const code = searchParams.get("code");
    try {
      const response = await githubLogin(code);
      setUser(response);
      navigate(`/project/${response.login}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className=" flex justify-center pt-10">
      <CircularProgress />
    </div>
  );
}
