import { useAtomValue } from "jotai";
import React from "react";
import { modalAtom } from "../../store";

export default function GlobalModal() {
  const modal = useAtomValue(modalAtom);

  if (!modal.isOpen) return null;
  return <>{modal?.component}</>;
}
