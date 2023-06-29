// LoadingModal.jsx
import React, { FC } from "react";
import Modal from "react-modal";

const LoadingModal: FC<{ open: boolean }> = ({ open }) => (
  <Modal
    shouldCloseOnOverlayClick={false}
    isOpen={open}
    contentLabel="Loading Modal"
    style={{
      content: {
        maxWidth: "200px",
        maxHeight: "200px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    }}
  >
    <h2>Please wait...</h2>
  </Modal>
);

export default LoadingModal;
