import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ReactComponent as GithubIcon } from "../assets/github.svg";

export default function LoginPage() {
  const handleLogin = () => {
    // Github 로그인 API 호출
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    // const redirectUri = "http://localhost:3000/callback";
    const redirectUri = "https://pitapat.ne.kr/callback";
    const scope = "repo, user";
    const githubOauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubOauthUrl;
  };

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-zinc-100 flex justify-center items-center">
      <div className=" w-[450px] h-[300px] bg-white rounded-xl flex flex-col px-5 py-3">
        <Link to={"/"} className=" flex gap-1 items-center">
          <IoIosArrowRoundBack />
          <span className=" text-xs">홈으로</span>
        </Link>
        <div className=" p-8">
          <div className=" flex justify-between">
            <h1 className=" text-[30px] font-semibold">로그인</h1>
            <GithubIcon className=" w-14 h-14" />
          </div>
          <h2 className=" text-sm pt-3">Github계정을 통해 로그인하세요.</h2>
          <div className=" h-full flex items-center">
            <button
              className=" w-full border rounded-lg h-[30px] flex justify-center items-center bg-black text-white text-sm"
              onClick={handleLogin}
            >
              GitHub 계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
