import { useAtom } from "jotai";
import SelectRepoModal from "../components/project/SelectRepoModal";
import { modalAtom } from "../store";
import MyRepoModal from "../components/project/MyRepoModal";

export default function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const components = {
    selectRepoModal: <SelectRepoModal />,
    MyRepoModal: <MyRepoModal />,
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openModal = ({ modalType, props }) => {
    setModal({
      isOpen: true,
      modalType,
      props,
    });
  };

  const currentComponent = components[modal?.modalType];

  return {
    modal: { ...modal, component: currentComponent },
    openModal,
    closeModal,
  };
}
