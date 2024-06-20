import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { templateIcons } from "../../utils/constant";
import useModal from "../../hooks/useModal";

export default function TemplateOptions() {
  const { openModal } = useModal();
  const openTemplateModal = (value, title) => {
    if (["react", "nodejs"].includes(value)) {
      openModal({
        modalType: "TemplateModal",
        props: {
          value: value,
          title: title,
        },
      });
    } else {
      openModal({
        modalType: "MessageModal",
        props: {
          message:
            "아직 준비 중인 서비스입니다.\n현재는 React와 Node.js만 지원합니다.",
        },
      });
    }
  };

  return (
    <div className=" flex flex-col gap-2">
      {templateIcons.map(({ Icon, title, subtitle, value }) => (
        <button
          className=" flex justify-between items-center px-4 h-[44px] hover:bg-zinc-100 rounded-md"
          key={title}
          onClick={() => openTemplateModal(value, title)}
        >
          <div className=" flex items-center gap-3">
            <Icon className=" w-6 h-6" />
            <div>
              <span>{title} - </span>
              <span className=" text-xs">{subtitle}</span>
            </div>
          </div>
          <MdKeyboardDoubleArrowRight />
        </button>
      ))}
    </div>
  );
}
