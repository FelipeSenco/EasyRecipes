import React, { useRef, useState } from "react";
import useClickOutside from "../../CustomHooks/useClickOutside";
import { FaEllipsisV, FaPen, FaTrash } from "react-icons/fa";

type EditDeleteMenuProps = {
  onEditClick: () => void;
  onDeleteClick: () => void;
  show: boolean;
};

const EditDeleteMenu: React.FC<EditDeleteMenuProps> = ({ show, onEditClick, onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => dropdownRef?.current && setIsOpen(false));

  if (!show) return null;
  return (
    <div ref={dropdownRef} className="hover:bg-gray-400 text-white font-bold  rounded relative w-[30px] h-[30px] self-end">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex justify-center items-center text-white w-full h-full"
        data-testid="edit-delete-button"
      >
        <FaEllipsisV className="h-2/3 w-2/3 mr-0" />
      </button>

      {isOpen && (
        <ul
          style={{ position: "relative", zIndex: 1000 }}
          className="w-[100px] absolute right-20 mt-1 bg-gray-700 text-white p-1 rounded shadow z-index-5"
        >
          <li
            className="py-1 px-1 hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onEditClick();
            }}
            data-testid="edit-dropdown-button"
          >
            <div className="flex flex-row justify-start gap-3 items-center">
              <FaPen />
              <span>Edit</span>
            </div>
          </li>
          <li
            className="py-1 px-1 hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onDeleteClick();
            }}
            data-testid="delete-dropdown-button"
          >
            <div className="flex flex-row justify-start gap-3 items-center">
              <FaTrash />
              <span>Delete</span>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default EditDeleteMenu;
