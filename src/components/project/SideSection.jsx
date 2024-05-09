import { useAtomValue } from "jotai";
import React from "react";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { userAtom } from "../../store";

export default function SideSection() {
  const user = useAtomValue(userAtom);

  return (
    <div className=" w-[300px] h-screen bg-[#26282e] p-5 text-white">
      <div className=" pt-3 flex justify-between">
        <img
          className=" w-14 h-14 rounded-full"
          src={user.avatar_url}
          alt="avatar"
        />
        <div>
          <div className=" text-xl text-right">{user.nickname}</div>
          <div className=" text-zinc-500 text-right">{user.login}</div>
        </div>
      </div>
      <div className=" mt-16 text-zinc-300 text-sm">Project</div>
      <div className="pt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between border border-purple-400 rounded p-2 text-zinc-200">
          <HiMiniSquare3Stack3D />
          <span>react</span>
        </div>
        <div className="flex items-center justify-between border border-purple-400 rounded p-2 text-zinc-200">
          <HiMiniSquare3Stack3D />
          <span>capstone-frontend</span>
        </div>
      </div>
    </div>
  );
}
