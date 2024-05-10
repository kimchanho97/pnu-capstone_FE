import CircularProgress from "@mui/material/CircularProgress";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchRepos } from "../../apis/user";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import { userAtom } from "../../store";
import RepoList from "./RepoList";

export default function MyRepoModal() {
  const { closeModal } = useModal();
  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [seletedRepo, setSelectedRepo] = useState(null);
  const user = useAtomValue(userAtom);
  const { isLoading, data: repos } = useQuery(
    ["/repos", user.login], // 쿼리 키에 user.login을 추가하여 유저마다 캐시 관리
    () => fetchRepos({ login: user.login }), // 함수 참조 대신 익명 함수 사용하여 호출
  );

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(31,41,55,0.2)] flex justify-center items-center z-10">
      <div className=" w-[650px] h-[600px] rounded-lg bg-white opacity-100 p-1 overflow-y-auto">
        <div className=" flex justify-end">
          <button onClick={closeModal} className="pr-3 self-start pt-3">
            <IoIosCloseCircleOutline />
          </button>
        </div>
        <div className=" flex flex-col items-center">
          <div className=" py-10">
            <GithubIcon className=" w-20 h-20" />
          </div>
          <div className=" w-full">
            <h1 className=" text-center text-[28px]">
              내 GitHub 저장소 배포하기
            </h1>
            <h6 className=" text-center pt-3 text-zinc-500">
              배포하길 원하는 GitHub 저장소를 선택해주세요.
            </h6>
          </div>
        </div>
        <div className=" mt-16 px-8">
          {isLoading ? (
            <div className=" mt-2 flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <RepoList
              repos={repos}
              seletedRepo={seletedRepo}
              setSelectedRepo={setSelectedRepo}
              isRepoListOpen={isRepoListOpen}
              setIsRepoListOpen={setIsRepoListOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
