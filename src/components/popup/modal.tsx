import { ReactNode, useEffect, useRef } from "react";
import { CustomLoadingSecondary } from "../loading_page/custom_loading";
import "./modal.css";
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      const modalElement = modalRef.current;
      const childrenElements = Array.from(modalElement.children);

      let maxChildHeight = 0;

      childrenElements.forEach((child) => {
        const childRect = child.getBoundingClientRect();
        maxChildHeight = Math.max(maxChildHeight, childRect.height);
      });
    }
  }, [showModal, children]);

  const close = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div
      className={`modal-overlay ${
        showModal ? "modal-visible" : "modal-hidden"
      }`}
      id={`p_${modalId}`}
      onClick={close}
    >
      {loading && <CustomLoadingSecondary title="loading" />}

      <div
        ref={modalRef}
        className="modal-content text-black-variant-2"
        style={{
          maxWidth: maxWidth || "900px",
          maxHeight: "90vh",
          minHeight: "auto",
          overflowY: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default DefaultModal;
