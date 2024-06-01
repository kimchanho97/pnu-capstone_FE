import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery, useQueryClient } from "react-query";
import { checkSubdomain, createProject } from "../../apis/project";
import { fetchRepos } from "../../apis/user";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import {
  creatingProjectsAtom,
  modalAtom,
  projectTimeoutsAtom,
  userAtom,
} from "../../store";
import { backendList, icons } from "../../utils/constant";

export default function TemplateModal() {
  const { closeModal } = useModal();
  const modal = useAtomValue(modalAtom);
  const user = useAtomValue(userAtom);
  const [repoName, setRepoName] = useState("");
  const IconComponent = icons[modal?.props?.value];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const [subdomain, setSubdomain] = useState("");
  const [isUsableSubdomain, setIsUsableSubdomain] = useState(false);
  const setCreatingProjects = useSetAtom(creatingProjectsAtom);
  const setProjectTimeouts = useSetAtom(projectTimeoutsAtom);
  const isBackend = backendList.includes(modal?.props?.value);

  const { data: repos } = useQuery(
    ["/repos", user.login], // 쿼리 키에 user.login을 추가하여 유저마다 캐시 관리
    () => fetchRepos({ login: user.login }), // 함수 참조 대신 익명 함수 사용하여 호출
  );

  const handleOnSubdomainChange = (e) => {
    setSubdomain(e.target.value);
    if (e.target.value === "") setIsUsableSubdomain(false);
  };

  const handleOnSubdomainCheck = async () => {
    if (!subdomain) {
      setErrorMessage("SubDomain을 입력해주세요.");
      return;
    }

    try {
      const response = await checkSubdomain(subdomain);
      console.log(response);
      setIsUsableSubdomain(true);
    } catch (error) {
      console.error(error);
      if (error.response.data?.error?.status === 4000) {
        setErrorMessage("이미 사용중인 SubDomain입니다.");
      }
      setIsUsableSubdomain(false);
    }
  };

  const handleRepoListOpen = () => {
    setIsRepoListOpen((prev) => !prev);
  };

  const moveGithubPage = () => {
    window.open(`
    https://github.com/PNU-Capstone-4/${modal?.props?.value}
    `);
  };

  const handleOnisPrivate = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleRepoNameChange = (e) => {
    setRepoName(e.target.value);
  };

  const handleCreateRepo = async () => {
    if (errorMessage) {
      setErrorMessage("");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!repoName) {
      setErrorMessage("저장소 이름을 입력해주세요.");
      return;
    }

    if (!subdomain) {
      setErrorMessage("SubDomain을 입력해주세요.");
      return;
    }

    if (!isUsableSubdomain) {
      setErrorMessage("SubDomain 중복 확인을 해주세요.");
      return;
    }

    setIsSubmitting(true);
    const config = {
      headers: {
        Authorization: `token ${sessionStorage.getItem("accessToken")}`,
        Accept: "application/vnd.github.v3+json",
      },
    };
    const data = {
      name: repoName,
      private: isPrivate,
    };

    try {
      const response = await axios.post(
        `https://api.github.com/repos/PNU-Capstone-4/${modal?.props?.value}/generate`,
        data,
        config,
      );
      console.log("Repository created successfully:", response.data);

      const projectData = {
        name: repoName,
        framework: modal?.props?.value,
        secrets: [],
        port: isBackend ? 8000 : 80,
        autoScaling: false,
        minReplicas: null,
        maxReplicas: null,
        cpuThreshold: 80,
        subdomain,
      };
      const res = await createProject(projectData);
      console.log(res);
      const projectId = res.projectId;
      setCreatingProjects((prev) => [...prev, projectId]);

      // 2분 후에 배열에서 해당 프로젝트 아이디를 제거
      const timeoutId = setTimeout(() => {
        setCreatingProjects((prev) => prev.filter((id) => id !== projectId));
      }, 1000 * 3);
      setProjectTimeouts((prev) => [...prev, { [projectId]: timeoutId }]);

      closeModal();
      queryClient.invalidateQueries(["/projects", user.login]);
    } catch (error) {
      console.error("Error creating repository:", error.response.data);
      if (error.response.data?.errors) {
        setErrorMessage("이미 존재하는 저장소 이름입니다.");
      }
    }
    setIsSubmitting(false);
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
            <IconComponent className=" w-20 h-20" />
          </div>
          <div className=" w-full">
            <h1 className=" text-center text-[28px]">{modal?.props?.title}</h1>
            <h6 className=" text-center pt-3 text-zinc-500 flex flex-col">
              <span>아래 {modal?.props?.title} 템플릿 소스코드가</span>
              <span>{user.nickname}님의 Github 계정에 생성됩니다.</span>
            </h6>
          </div>
          <button
            className=" flex text-blue-500 items-center gap-2 mt-1"
            onClick={moveGithubPage}
          >
            <GithubIcon className=" w-4 h-4" />
            <span>PNU-Capstone-4/{modal?.props?.value}</span>
          </button>
        </div>
        <div className=" mt-16 px-8">
          <div className=" text-sm pl-2">GitHub 저장소</div>
          <div className=" mt-3 flex gap-3">
            <div className=" border w-[200px] p-2 flex gap-2 items-center h-[45px]">
              <img
                className=" w-8 h-8 rounded-full"
                src={user.avatarUrl}
                alt="avatar"
              />
              <span className=" w-[200px] truncate">{user.login}</span>
            </div>
            <div className=" w-full relative">
              <input
                type="text"
                value={repoName}
                onChange={handleRepoNameChange}
                placeholder="저장소 이름을 입력하세요."
                className=" border w-full h-[45px] p-2 text-sm"
              />
              <button
                className=" absolute top-[14px] right-[8px]"
                onClick={handleRepoListOpen}
              >
                {isRepoListOpen ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
              {isRepoListOpen && (
                <ul className="w-full border">
                  {repos.map(({ id, name, private: isPrivate }) => (
                    <li
                      key={id}
                      className=" flex w-full justify-between items-center h-[45px] p-3 px-5 text-sm"
                    >
                      <span>{name}</span>
                      {isPrivate && (
                        <span className=" bg-orange-500 text-white p-1 text-xs px-2 rounded-md">
                          private
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <div className=" text-sm pl-2 mt-5">SubDomain</div>
            <div className=" flex items-center gap-1  mt-1">
              <input
                type="text"
                className="w-full border h-[40px] p-4"
                placeholder="사용하실 SubDomain을 입력해주세요."
                value={subdomain}
                onChange={handleOnSubdomainChange}
              />
              <button
                className=" text-xs border px-2 w-[80px] h-[40px] bg-zinc-200"
                onClick={handleOnSubdomainCheck}
              >
                중복 확인
              </button>
            </div>
            {isUsableSubdomain && subdomain && (
              <div className=" p-1 text-sm text-blue-500">
                사용가능한 SubDomain입니다.
              </div>
            )}
          </div>
          <label
            className=" relative cursor-pointer mt-6 flex gap-2 items-center w-fit"
            htmlFor="isPrivate"
          >
            <input
              id="isPrivate"
              className=" w-5 h-5 cursor-pointer"
              type="checkbox"
              onChange={handleOnisPrivate}
              checked={isPrivate}
            />
            {!isPrivate && (
              <FaCheck
                className=" absolute top-1 left-1 text-zinc-400"
                size={12}
              />
            )}
            <span className=" text-sm">비공개 저장소로 생성하기</span>
          </label>
          {isSubmitting ? (
            <div className="mt-14 flex justify-center items-center">
              <CircularProgress size={25} />
            </div>
          ) : (
            <div className=" mt-8">
              {errorMessage && (
                <div className=" px-2 py-1 text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
              <button
                className=" w-full h-[40px] bg-blue-500 text-white rounded-lg mb-16"
                onClick={handleCreateRepo}
              >
                저장소 생성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
