import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { templateIcons } from "../../utils/constant";

export default function TemplateOptions() {
  return (
    <div className=" flex flex-col gap-2">
      {templateIcons.map(({ Icon, title, subtitle }, index) => (
        <button className=" flex justify-between items-center px-4 h-[44px] hover:bg-zinc-100 rounded-md">
          <div key={index} className=" flex items-center gap-3">
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
