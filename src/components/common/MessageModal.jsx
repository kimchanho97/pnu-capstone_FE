import { useAtomValue } from "jotai";
import React, { useRef } from "react";
import useModal from "../../hooks/useModal";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { modalAtom } from "../../store";

export default function MessageModal() {
  const modal = useAtomValue(modalAtom);
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const { closeModal } = useModal();

  useOnClickOutside(modalRef, modalWrapperRef, closeModal);

  return (
    <div
      className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(31,41,55,0.2)] flex justify-center items-center z-10"
      ref={modalWrapperRef}
    >
      <div
        className=" w-[400px] h-[180px] rounded bg-white opacity-100 p-1 overflow-y-auto"
        ref={modalRef}
      >
        <div className=" flex flex-col p-10 items-center justify-between h-full">
          <div className=" font-semibold flex flex-col items-center">
            {modal?.props?.message?.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <button
            className=" px-4 py-2 bg-blue-500 text-white rounded-md text-xs"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
