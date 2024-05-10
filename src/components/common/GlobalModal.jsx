import React from "react";
import useModal from "../../hooks/useModal";

export default function GlobalModal() {
  const { modal } = useModal();

  if (!modal.isOpen) return null;
  return <>{modal?.component}</>;
}
