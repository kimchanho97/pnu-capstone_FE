import { useAtom } from "jotai";
import MyRepoModal from "../components/project/MyRepoModal";
import SelectRepoModal from "../components/project/SelectRepoModal";
import TemplateModal from "../components/project/TemplateModal";
import { modalAtom } from "../store";

export default function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const components = {
    SelectRepoModal: <SelectRepoModal />,
    MyRepoModal: <MyRepoModal />,
    TemplateModal: <TemplateModal />,
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
