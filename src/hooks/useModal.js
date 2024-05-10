import { useAtom } from "jotai";
import SelectRepoModal from "../components/project/SelectRepoModal";
import { modalAtom } from "../store";
import MyRepoModal from "../components/project/MyRepoModal";

export default function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const modalType = {
    selectRepoModal: {
      component: <SelectRepoModal />,
    },
    MyRepoModal: {
      component: <MyRepoModal />,
    },
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openModal = ({ type, props }) => {
    setModal({
      isOpen: true,
      component: modalType[type].component,
      props,
    });
  };

  return { modal, openModal, closeModal };
}
