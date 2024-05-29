import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

export const userAtom = atomWithStorage(
  "user",
  {
    id: "",
    login: "",
    avatarUrl: "",
    nickname: "",
  },
  storage,
);

export const modalAtom = atomWithStorage(
  "modal",
  {
    isOpen: false,
    props: {},
    modalType: "",
  },
  storage,
);

export const projectAtom = atomWithStorage("projects", [], storage);

export const creatingProjectsAtom = atomWithStorage(
  "creatingProjects",
  [],
  storage,
);

export const projectTimeoutsAtom = atomWithStorage(
  "projectTimeouts",
  [],
  storage,
);
