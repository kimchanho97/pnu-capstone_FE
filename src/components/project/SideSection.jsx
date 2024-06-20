import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GoStar, GoStarFill } from "react-icons/go";
import { HiSquares2X2 } from "react-icons/hi2";
import { useMutation, useQueryClient } from "react-query";
import { addFavorite, removeFavorite } from "../../apis/project";
import { projectAtom, userAtom } from "../../store";
import useModal from "../../hooks/useModal";

export default function SideSection({ setSelectedProject, favorites }) {
  const user = useAtomValue(userAtom);
  const projects = useAtomValue(projectAtom);
  const frameworks = [...new Set(projects.map((project) => project.framework))];
  const [selectedFramework, setSelectedFramework] = useState("");
  const [isFrameworkListOpen, setIsFrameworkListOpen] = useState(false);
  const { mutate: addFavoriteMutate } = useMutation(addFavorite);
  const { mutate: removeFavoriteMutate } = useMutation(removeFavorite);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const toggleFrameworkList = () => {
    setIsFrameworkListOpen((prev) => !prev);
  };

  const selectFramework = (e) => {
    setSelectedFramework(e.target.value);
    setIsFrameworkListOpen(false);
  };

  const handleAddFavorite = async (projectId) => {
    if (favorites.includes(projectId)) {
      openModal({
        modalType: "MessageModal",
        props: {
          message: "이미 즐겨찾기한 프로젝트입니다.",
        },
      });
      return;
    }
    setIsSubmitting(true);
    addFavoriteMutate(
      { userId: user.id, projectId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/favorites", user.id]);
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleRemoveFavorite = async (projectId) => {
    setIsSubmitting(true);
    removeFavoriteMutate(
      { userId: user.id, projectId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/favorites", user.id]);
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <div className=" w-[300px] bg-[#26282e] p-5 text-white h-screen overflow-y-auto">
      <div className=" pt-3 flex justify-between">
        <img
          className=" w-14 h-14 rounded-full"
          src={user.avatarUrl}
          alt="avatar"
        />
        <div>
          <div className=" text-xl text-right">{user.nickname}</div>
          <div className=" text-zinc-500 text-right">{user.login}</div>
        </div>
      </div>
      <div className=" relative w-full py-1 pb-5 mt-10">
        <button
          onClick={toggleFrameworkList}
          className=" flex w-full justify-between items-center h-[40px] p-3 text-xs bg-zinc-900 rounded-sm"
        >
          {selectedFramework || "프레임워크별로 보기"}
          {isFrameworkListOpen ? (
            <BsChevronUp size={10} />
          ) : (
            <BsChevronDown size={10} />
          )}
        </button>
        {isFrameworkListOpen && (
          <ul className="w-full absolute">
            <li>
              <button
                onClick={selectFramework}
                value={""}
                className=" flex w-full justify-between items-center h-[40px] p-3 text-xs hover:bg-zinc-700 bg-zinc-900"
              >
                <span className=" pointer-events-none">전체 보기</span>
              </button>
            </li>
            {frameworks.map((framework, index) => (
              <li key={index}>
                <button
                  onClick={selectFramework}
                  value={framework}
                  className=" flex w-full justify-between items-center h-[40px] p-3 text-xs hover:bg-zinc-700 bg-zinc-900"
                >
                  <span className=" pointer-events-none">{framework}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className=" text-[10px] w-full text-right text-zinc-100">
        즐겨찾기
      </div>
      {favorites.length === 0 ? (
        <div className="text-zinc-400 text-center py-3 text-sm">
          즐겨찾기한 프로젝트가 없습니다.
        </div>
      ) : (
        <div className="pt-2 flex flex-col gap-3">
          {projects.map((project) => {
            if (!favorites.includes(project.id)) {
              return null;
            }
            return (
              <div
                key={project.id}
                className=" flex items-center justify-between border border-blue-300 rounded p-2 text-zinc-200"
              >
                <button
                  className=" flex items-center gap-2"
                  onClick={() => setSelectedProject(project)}
                >
                  <HiSquares2X2 className=" text-blue-300" />
                  <span className=" text-sm text-blue-300">{project.name}</span>
                </button>
                <button
                  onClick={() => handleRemoveFavorite(project.id)}
                  disabled={isSubmitting}
                >
                  <GoStarFill className=" text-blue-300" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className=" text-[10px] w-full text-right text-zinc-100 py-2 pt-5">
        전체 프로젝트
      </div>
      <div className=" flex flex-col gap-3">
        {projects.map((project) => {
          if (selectedFramework && project.framework !== selectedFramework) {
            return null;
          }
          return (
            <div
              key={project.id}
              className=" flex items-center justify-between border border-zinc-400 rounded p-2 text-zinc-200 "
            >
              <button
                className=" flex items-center gap-2"
                onClick={() => setSelectedProject(project)}
              >
                <HiSquares2X2 />
                <span className=" text-sm">{project.name}</span>
              </button>
              {favorites.includes(project.id) ? (
                <button
                  onClick={() => handleRemoveFavorite(project.id)}
                  disabled={isSubmitting}
                >
                  <GoStarFill />
                </button>
              ) : (
                <button
                  onClick={() => handleAddFavorite(project.id)}
                  disabled={isSubmitting}
                >
                  <GoStar />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
