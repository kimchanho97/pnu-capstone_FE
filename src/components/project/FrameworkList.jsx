import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { icons, templateIcons } from "../../utils/constant";

export default function FrameworkList({
  setIsFrameworkListOpen,
  isFrameworkListOpen,
  selectedFramework,
  setSelectedFramework,
}) {
  const handleFrameworkListOpen = () => {
    setIsFrameworkListOpen((prev) => !prev);
  };
  const selectFramework = (e) => {
    setSelectedFramework(e.target.value);
    setIsFrameworkListOpen(false);
  };
  const IconComponent = icons[selectedFramework];

  return (
    <div className=" relative w-full">
      <button
        onClick={handleFrameworkListOpen}
        className=" flex w-full justify-between items-center h-[45px] border p-3 text-sm"
      >
        {selectedFramework ? (
          <div className=" flex gap-4">
            <IconComponent className=" w-5 h-5" />
            <span>{selectedFramework}</span>
          </div>
        ) : (
          <span>언어/프레임워크를 선택하세요.</span>
        )}
        {isFrameworkListOpen ? (
          <BsChevronUp size={15} />
        ) : (
          <BsChevronDown size={15} />
        )}
      </button>
      {isFrameworkListOpen && (
        <ul className="w-full border">
          {templateIcons.map(({ Icon, title, value }) => (
            <li key={value}>
              <button
                onClick={selectFramework}
                value={value}
                className=" flex w-full items-center h-[45px] p-3 px-5 text-sm hover:bg-zinc-100 gap-4"
              >
                <Icon className=" w-5 h-5" />
                <span>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
