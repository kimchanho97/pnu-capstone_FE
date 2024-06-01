import React, { useEffect, forwardRef } from "react";

const AutoResizeTextarea = forwardRef((props, ref) => {
  const adjustHeight = (element) => {
    element.style.height = "auto"; // 높이를 자동으로 설정하여 스크롤을 초기화
    element.style.height = element.scrollHeight + "px"; // scrollHeight를 사용하여 내용에 맞게 높이 조정
  };

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      adjustHeight(textarea); // 초기 높이 조정

      const handleInput = () => adjustHeight(textarea);
      textarea.addEventListener("input", handleInput);

      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, [ref]);

  return (
    <textarea
      ref={ref}
      className="w-full p-5 text-sm min-h-[200px] h-full resize-none"
      placeholder="Type your text here..."
    />
  );
});

export default AutoResizeTextarea;
