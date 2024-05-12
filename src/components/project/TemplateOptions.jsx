import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { templateIcons } from "../../utils/constant";
import useModal from "../../hooks/useModal";

export default function TemplateOptions() {
  const { openModal } = useModal();
  const openTemplateModal = (value, title) => {
    openModal({
      modalType: "TemplateModal",
      props: {
        value: value,
        title: title,
      },
    });
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
