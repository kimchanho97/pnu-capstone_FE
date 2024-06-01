import { useAtomValue } from "jotai";
import React from "react";
import { useRef } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { userAtom } from "../../store";
import { deleteProject } from "../../apis/project";
import AutoResizeTextarea from "../common/AutoResizeTextarea";

export default function ProjectSetting({ project, secrets, subdomain }) {
  const user = useAtomValue(userAtom);
  const descriptionRef = useRef(null);
  const detailedDescriptionRef = useRef(null);

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col gap-12">
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>프로젝트 정보</span>
        </div>
        <div className=" bg-white">
          <div className=" p-5 flex justify-between items-center text-sm">
            <div>이름</div>
            <div className=" font-semibold ">{project.name}</div>
          </div>
          <div className=" border-t border-zinc-200 p-5 flex justify-between items-center text-sm">
            <div>저장소</div>
            <div className=" font-semibold">
              {user.login} / {project.name}
            </div>
          </div>
          <div className=" border-t border-zinc-200 p-5 flex justify-between items-center text-sm">
            <div>브랜치</div>
            <div className=" font-semibold">main</div>
          </div>
          <div className=" border-t border-zinc-200 p-5 flex justify-between items-center text-sm">
            <div>서브도메인</div>
            <div className=" font-semibold">{subdomain}</div>
          </div>
        </div>
      </div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>한 줄 설명</span>
        </div>
        <AutoResizeTextarea ref={descriptionRef} />
        <button
          className=" bg-blue-500 text-white rounded px-5 py-2 text-[12px] mt-1"
          onClick={handleDeleteProject}
        >
          저장하기
        </button>
      </div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>상세 설명</span>
        </div>
        <AutoResizeTextarea ref={detailedDescriptionRef} />
        <button
          className=" bg-blue-500 text-white rounded px-5 py-2 text-[12px] mt-1"
          onClick={handleDeleteProject}
        >
          저장하기
        </button>
      </div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>환경 변수</span>
        </div>
        <div className=" bg-white w-full">
          <div className=" font-semibold text-sm p-5 flex border-b border-zinc-200">
            <div className=" w-1/3">KEY</div>
            <div>VALUE</div>
          </div>
          {secrets.map(({ key, value }) => (
            <div key={key} className=" p-5 flex items-center text-sm">
              <div className=" w-1/3">{key}</div>
              <div className=" font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className=" mb-12">
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>프로젝트 삭제</span>
        </div>
        <div className=" bg-white p-5">
          <div className=" text-sm text-zinc-500 tracking-tight font-semibold">
            프로젝트를 삭제하면 모든 데이터가 삭제됩니다.
          </div>
          <button
            className=" bg-red-500 text-white px-5 py-[6px] rounded-md mt-5"
            onClick={handleDeleteProject}
          >
            프로젝트 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
