import { useAtomValue } from "jotai";
import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { userAtom } from "../../store";

export default function RepoList({
  repos,
  seletedRepo,
  setSelectedRepo,
  isRepoListOpen,
  setIsRepoListOpen,
}) {
  const user = useAtomValue(userAtom);

  const handleSelectRepo = () => {
    setIsRepoListOpen((prev) => !prev);
  };

  const selectRepo = (e) => {
    setSelectedRepo(e.target.value);
    setIsRepoListOpen(false);
  };
  return (
    <>
      <div className=" text-sm pl-2">GitHub 저장소</div>
      <div className=" mt-3 flex gap-3">
        <div className=" border w-[200px] p-2 flex gap-2 items-center h-[45px]">
          <img
            className=" w-8 h-8 rounded-full"
            src={user.avatar_url}
            alt="avatar"
          />
          <span className=" w-[200px] truncate">{user.login}</span>
        </div>

        <div className=" relative w-full">
          <button
            id="repo"
            onClick={handleSelectRepo}
            className=" flex w-full justify-between items-center h-[45px] border p-3 text-sm"
          >
            {seletedRepo || "저장소를 선택하세요."}
            {isRepoListOpen ? (
              <BsChevronUp size={15} />
            ) : (
              <BsChevronDown size={15} />
            )}
          </button>
          {isRepoListOpen && (
            <ul className="w-full border">
              {repos.map(({ id, name }) => (
                <li key={id}>
                  <button
                    onClick={selectRepo}
                    value={name}
                    className=" flex w-full justify-between items-center h-[45px] p-3 px-5 text-sm hover:bg-zinc-100"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
