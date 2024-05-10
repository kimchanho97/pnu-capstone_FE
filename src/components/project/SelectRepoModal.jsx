import React, { useRef } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useModal from "../../hooks/useModal";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import TemplateOptions from "./TemplateOptions";

export default function SelectRepoModal() {
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const { closeModal, openModal } = useModal();
  const handleMyRepoDeploy = () => {
    openModal({ modalType: "MyRepoModal" });
  };
  useOnClickOutside(modalRef, modalWrapperRef, closeModal);

  return (
    <div
      className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(31,41,55,0.2)] flex justify-center items-center z-10"
      ref={modalWrapperRef}
    >
      <div
        className=" w-[550px] h-[600px] rounded-lg bg-white opacity-100 p-1 overflow-y-auto"
        ref={modalRef}
      >
        <div className=" flex justify-between">
          <div className=" text-[12px] text-zinc-500 py-3 px-5">배포하기</div>
          <button onClick={closeModal} className="pr-3 self-start pt-3">
            <IoIosCloseCircleOutline />
          </button>
        </div>
        <button
          className=" flex justify-between items-center px-4 h-[44px] w-full hover:bg-zinc-100 rounded-md"
          onClick={handleMyRepoDeploy}
        >
          <div className=" flex items-center gap-3">
            <CiSquarePlus className=" text-green-500" />
            <span>내 Github 저장소 배포하기</span>
          </div>
          <MdKeyboardDoubleArrowRight />
        </button>
        <div className=" text-[12px] text-zinc-500 py-3 px-5">템플릿</div>
        <TemplateOptions />
      </div>
    </div>
  );
}
