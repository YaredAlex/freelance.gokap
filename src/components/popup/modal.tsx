import { ReactNode } from "react";
import { CustomLoadingSecondary } from "../loading_page/custom_loading";

const DefaultModal = ({
  children,
  showModal,
  loading,
  setShowModal,
  modalId,
  maxWidth,
}: {
  children: ReactNode;
  showModal: boolean;
  loading: boolean;
  modalId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  maxWidth?: string;
}) => {
  const close = () => {
    const portal = document.getElementById(`p_${modalId}`);
    window.onclick = function (event) {
      if (event.target == portal) {
        setShowModal(false);
      }
    };
  };
  return (
    <div
      className={`position-fixed bg-modal  d-flex align-items-center justify-content-center p-2 ${
        showModal ? "d-flex" : "d-none"
      }`}
      style={{
        top: "0",
        left: "0",
        zIndex: "300",
        width: "100%",
        height: "100%",
      }}
      id={`p_${modalId}`}
      onClick={close}
    >
      {loading && <CustomLoadingSecondary title="loading" />}

      <div
        className="bg-white-v-4 rounded border-card p-sm-4 px-2 py-4"
        style={{
          maxWidth: `${maxWidth ? maxWidth : "600px"}`,
          width: "100%",
          overflowY: "auto",
          maxHeight: "90%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultModal;
