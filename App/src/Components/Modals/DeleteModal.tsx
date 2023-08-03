import React, { FC, useEffect, useState } from "react";
import Modal from "react-modal";

type DeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isError?: boolean;
  isLoading?: boolean;
};
const DeleteModal: FC<DeleteModalProps> = ({ open, onCancel, onConfirm, isLoading, isError }) => {
  const [showApiErrorMessage, setShowApiErrorMessage] = useState(false);
  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      onAfterClose={() => setShowApiErrorMessage(false)}
      isOpen={open}
      contentLabel="Delete Item"
      className="flex items-center justify-center text-white fixed top-0 left-0 right-0 bottom-0 m-auto bg-gray-800 h-1/5 w-1/4"
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
      }}
    >
      {isLoading && <h1 className="text-xl">Please wait...</h1>}
      {!isLoading && (
        <div data-testid="delete-modal" className="flex flex-col justify-around items-center h-full w-full p-4">
          <h1 className="text-xl">Are you sure you want to delete?</h1>
          {showApiErrorMessage && isError && <h1 className="text-md text-red-500">Something went wrong. Please try again later.</h1>}
          <div className="flex justify-around py-2 w-full">
            <button onClick={onCancel} className="px-4 py-2 mr-2 bg-gray-700 hover:bg-gray-600 hover:text-black rounded">
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                setShowApiErrorMessage(true);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white hover:text-black rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteModal;
