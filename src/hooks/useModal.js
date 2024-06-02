import { useAtom } from "jotai";
import MessageModal from "../components/common/MessageModal";
import LogModal from "../components/project/LogModal";
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
    MessageModal: <MessageModal />,
    LogModal: <LogModal />,
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
