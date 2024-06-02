import CircularProgress from "@mui/material/CircularProgress";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQuery, useQueryClient } from "react-query";
import { checkSubdomain, createProject } from "../../apis/project";
import { fetchRepos } from "../../apis/user";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import {
  creatingProjectsAtom,
  projectTimeoutsAtom,
  userAtom,
} from "../../store";
import { backendList } from "../../utils/constant";
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
  const [port, setPort] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoScaling, setAutoScaling] = useState({
    minReplicas: "",
    maxReplicas: "",
  });
  const [autoScailingEnabled, setAutoScailingEnabled] = useState(false);
  const [cpuThreshold, setCpuThreshold] = useState(80);
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isUsableSubdomain, setIsUsableSubdomain] = useState(false);
  const setCreatingProjects = useSetAtom(creatingProjectsAtom);
  const setProjectTimeouts = useSetAtom(projectTimeoutsAtom);
  const isBackend = backendList.includes(selectedFramework);

  const { isLoading, data: repos } = useQuery(
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
    if (subdomain === "backend") {
      setErrorMessage("이미 사용중인 SubDomain입니다.");
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

  const handleOnPortChange = (e) => {
    setPort(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleOnautoScalingEnabled = (e) => {
    setAutoScailingEnabled(e.target.checked);
    if (!e.target.checked) {
      setAutoScaling({ minReplicas: "", maxReplicas: "" });
      setCpuThreshold(80);
    }
  };

  const handleOnAutoScalingChange = (e) => {
    const { name, value } = e.target;
    setAutoScaling((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleOnCpuPercentageChange = (e) => {
    setCpuThreshold(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleOnCreateProject = async () => {
    if (errorMessage) {
      setErrorMessage("");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!selectedFramework) {
      setErrorMessage("언어/프레임워크를 선택해주세요.");
      return;
    }

    if (isBackend && !port) {
      setErrorMessage("포트를 입력해주세요.");
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

    if (autoScailingEnabled) {
      if (!autoScaling.minReplicas || !autoScaling.maxReplicas) {
        setErrorMessage("최소 Pod와 최대 Pod 수를 입력해주세요.");
        return;
      }
      if (autoScaling.minReplicas > autoScaling.maxReplicas) {
        setErrorMessage("최소 Pod 수는 최대 Pod 수보다 작아야합니다.");
        return;
      }
      if (autoScaling.minReplicas < 1 || autoScaling.minReplicas > 10) {
        setErrorMessage("최소 Pod 수는 1 ~ 10 사이여야합니다.");
        return;
      }
      if (autoScaling.maxReplicas < 1 || autoScaling.maxReplicas > 10) {
        setErrorMessage("최대 Pod 수는 1 ~ 10 사이여야합니다.");
        return;
      }
      if (!cpuThreshold) {
        setErrorMessage("CPU 사용량 임계치를 입력해주세요.");
        return;
      }
      if (cpuThreshold < 1 || cpuThreshold > 100) {
        setErrorMessage("CPU 사용량 임계치는 1 ~ 100 사이여야합니다.");
        return;
      }
    }
    try {
      const data = {
        name: selectedRepo,
        framework: selectedFramework,
        secrets: secretVariables,
        port: isBackend ? port : 80,
        autoScaling: autoScailingEnabled,
        minReplicas: autoScaling.minReplicas,
        maxReplicas: autoScaling.maxReplicas,
        cpuThreshold,
        subdomain,
      };
      setIsSubmitting(true);
      const response = await createProject(data);
      console.log(response);
      const projectId = response.projectId;
      setCreatingProjects((prev) => [...prev, projectId]);

      // 2분 후에 배열에서 해당 프로젝트 아이디를 제거
      const timeoutId = setTimeout(() => {
        setCreatingProjects((prev) => prev.filter((id) => id !== projectId));
      }, 1000 * 5);
      setProjectTimeouts((prev) => [...prev, { [projectId]: timeoutId }]);

      closeModal();
      queryClient.invalidateQueries(["/projects", user.login]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setSecretVariables([]); // 선택한 프레임워크가 변경될 때마다 secretVariables 초기화
    setPort("");
    setSubdomain("");
    setIsUsableSubdomain(false);
    setAutoScailingEnabled(false); // 선택한 프레임워크가 변경될 때마다 autoScaling 초기화
    setAutoScaling({ minReplicas: "", maxReplicas: "" });
    setCpuThreshold(80);
    setErrorMessage("");
  }, [selectedFramework, selectedRepo]);

  useEffect(() => {
    setSelectedFramework("");
  }, [selectedRepo]);

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
            <div className=" mt-16 flex flex-col gap-10 mb-10">
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
                <div className=" text-sm mb-1">환경 변수</div>
                <SecretVariableList
                  secretVariables={secretVariables}
                  setSecretVariables={setSecretVariables}
                />
              </div>
              <div>
                <div className=" text-sm mb-1">SubDomain</div>
                <div className=" flex items-center gap-1">
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
              {isBackend && (
                <>
                  <div>
                    <div className=" text-sm mb-1">Port</div>
                    <input
                      type="text"
                      className="w-full border h-[40px] p-4"
                      placeholder="Port"
                      value={port}
                      onChange={handleOnPortChange}
                    />
                  </div>
                  <label
                    className=" relative cursor-pointer flex gap-2 items-center w-fit"
                    htmlFor="autoScailingEnabled"
                  >
                    <input
                      id="autoScailingEnabled"
                      className=" w-5 h-5 cursor-pointer"
                      type="checkbox"
                      onChange={handleOnautoScalingEnabled}
                      checked={autoScailingEnabled}
                    />
                    {!autoScailingEnabled && (
                      <FaCheck
                        className=" absolute top-1 left-1 text-zinc-400"
                        size={12}
                      />
                    )}
                    <span className=" text-sm">Auto Scaling 사용</span>
                  </label>
                  {autoScailingEnabled && (
                    <>
                      <div>
                        <div className=" text-sm mb-1">최소 Pod(1 ~ 10)</div>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          name="minReplicas"
                          className="w-full border h-[40px] p-4"
                          placeholder="최소 Pod 수 : 1 ~ 10"
                          value={autoScaling.minReplicas}
                          onChange={handleOnAutoScalingChange}
                        />
                      </div>
                      <div>
                        <div className=" text-sm mb-1">최대 Pod(1 ~ 10)</div>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          name="maxReplicas"
                          className="w-full border h-[40px] p-4"
                          placeholder="최대 Pod 수 : 1 ~ 10"
                          value={autoScaling.maxReplicas}
                          onChange={handleOnAutoScalingChange}
                        />
                      </div>
                      <div>
                        <div className=" text-sm mb-1">
                          CPU 사용량 임계치(해당 수치 이상일 때 파드를 추가로
                          생성합니다)
                        </div>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          className="w-full border h-[40px] p-4"
                          placeholder="Default: 80"
                          value={cpuThreshold}
                          onChange={handleOnCpuPercentageChange}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {isSubmitting ? (
                <div className=" flex justify-center items-center">
                  <CircularProgress size={25} />
                </div>
              ) : (
                <div className=" mt-5 flex flex-col gap-1 ">
                  {errorMessage && (
                    <input
                      type="text"
                      value={errorMessage}
                      readOnly
                      className="text-red-500 text-sm px-2 font-semibold"
                    />
                  )}
                  <button
                    className=" w-full h-[40px] bg-blue-500 text-white rounded-lg"
                    onClick={handleOnCreateProject}
                  >
                    프로젝트 생성하기
                  </button>
                </div>
              )}
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
