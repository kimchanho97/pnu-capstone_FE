import CircularProgress from "@mui/material/CircularProgress";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchRepos } from "../../apis/user";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import { userAtom } from "../../store";
import FrameworkList from "./FrameworkList";
import RepoList from "./RepoList";
import SecretVariableList from "./SecretVariableList";

export default function MyRepoModal() {
  const { closeModal } = useModal();
  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [isFrameworkListOpen, setIsFrameworkListOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [secretVariables, setSecretVariables] = useState([]);
  const [port, setPort] = useState(null);
  const user = useAtomValue(userAtom);
  const { isLoading, data: repos } = useQuery(
    ["/repos", user.login], // 쿼리 키에 user.login을 추가하여 유저마다 캐시 관리
    () => fetchRepos({ login: user.login }), // 함수 참조 대신 익명 함수 사용하여 호출
  );
  const isBackend = [
    "nextjs",
    "nestjs",
    "nodejs",
    "kotlin",
    "django",
    "flask",
    "fastapi",
    "spring",
    "nginx",
    "docker",
  ].includes(selectedFramework);

  const handlePortChange = (e) => {
    const { value } = e.target;
    setPort(value);
  };

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
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
              isRepoListOpen={isRepoListOpen}
              setIsRepoListOpen={setIsRepoListOpen}
            />
          )}
          {selectedRepo ? (
            <div className=" mt-16 flex flex-col gap-10 mb-20">
              <div>
                <div className=" text-sm mb-1">프로젝트 이름</div>
                <div className=" w-full h-[40px] border pl-3 text-zinc-500 flex items-center bg-zinc-50">
                  {selectedRepo}
                </div>
                <div className=" text-sm p-1 text-blue-500">
                  프로젝트 이름은 레포지토리 이름으로 대체됩니다.
                </div>
              </div>
              <div>
                <div className=" text-sm mb-1">언어/프레임워크 선택</div>
                <FrameworkList
                  setIsFrameworkListOpen={setIsFrameworkListOpen}
                  isFrameworkListOpen={isFrameworkListOpen}
                  selectedFramework={selectedFramework}
                  setSelectedFramework={setSelectedFramework}
                  repos={repos}
                />
              </div>
              <div>
                <div className=" text-sm mb-1">Secret Variables</div>
                <SecretVariableList
                  secretVariables={secretVariables}
                  setSecretVariables={setSecretVariables}
                />
              </div>
              {isBackend && (
                <div>
                  <div className=" text-sm mb-1">Port</div>
                  <input
                    type="text"
                    className="w-full border h-[40px] p-4"
                    placeholder="Port"
                    value={port}
                    onChange={handlePortChange}
                  />
                </div>
              )}
              <button className=" w-full h-[40px] bg-blue-500 text-white rounded-lg mt-10">
                배포하기
              </button>
            </div>
          ) : (
            <div className=" mt-16 text-center text-zinc-500">
              빌드를 진행하려면 선택하신 저장소에 Dockerfile이 구성되어 있어야
              합니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
