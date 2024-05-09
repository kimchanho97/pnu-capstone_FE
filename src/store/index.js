import { atom } from "jotai";

export const userAtom = atom({
  id: "",
  login: "",
  avatar_url: "",
  nickname: "",
});

export const modalAtom = atom({
  isOpen: false,
  props: {},
  conponent: null,
});
