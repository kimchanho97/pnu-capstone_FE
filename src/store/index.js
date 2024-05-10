import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

export const userAtom = atomWithStorage(
  "user",
  {
    id: "",
    login: "",
    avatar_url: "",
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
