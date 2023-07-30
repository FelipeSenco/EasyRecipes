import React, { FC, useContext, useEffect, useState } from "react";
import { BuildOrderAction } from "../../Types&Globals/BuildOrders";
import { FaTrash } from "react-icons/fa";
import AppContext from "../../Contexts/AppContext";

type BuildOrderActionsInputProps = {
  actions: BuildOrderAction[];
  setActions: React.Dispatch<React.SetStateAction<BuildOrderAction[]>>;
  showValidationErrors: boolean;
  maxSupply?: number;
};

export const BuildOrderActionsInput: FC<BuildOrderActionsInputProps> = ({ actions, setActions, showValidationErrors, maxSupply = 200 }) => {
  const { minBuildOrderActions } = useContext(AppContext);
  useEffect(() => {
    if (!actions.length) {
      setActions(initialState);
    }
  }, []);

  const handleUpdateAction = (index: number, field: string, value: any) => {
    if (field === "supply") {
      value = Number(value);
      if (value < 0) value = 0;
      if (value > maxSupply) value = maxSupply;
    }
    if (field === "clock") {
      if (value?.length > 2 && !value?.includes(":")) value = value.slice(0, 2) + ":" + value.slice(2);
    }
    setActions((prev) => prev.map((action, idx) => (idx === index ? { ...action, [field]: value } : action)));
  };
  const handleRemoveAction = (index: number) => {
    setActions((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col gap-2 pt-4">
      <label className="text-xl font-semibold text-blue-400">Build Order Actions: </label>
      <div className="flex justify-between gap-5 ">
        <div className="w-1/12 flex flex-col">
          <label className="text-lg font-semibold text-indigo-300">Clock:</label>
        </div>
        <div className="w-1/12 flex flex-col">
          <label className="text-lg font-bold text-indigo-300">Supply: </label>
        </div>
        <div className="w-full flex flex-col">
          <label className="text-lg font-semibold text-indigo-300">Instructions: </label>
        </div>
      </div>
      {actions.map((action, index) => (
        <div key={index}>
          <div className="flex justify-between gap-5 ">
            <div className="w-1/12 flex flex-col">
              <input
                placeholder="00:00"
                maxLength={5}
                type="text"
                value={action.clock}
                onChange={(e) => handleUpdateAction(index, "clock", e.target.value)}
                className="block mt-1 py-1 w-full rounded-md bg-gray-800 text-white pl-1 overflow-auto"
              />
            </div>
            <div className="w-1/12 flex flex-col">
              <input
                placeholder="0"
                value={action.supply}
                min={0}
                max={maxSupply}
                type="number"
                onChange={(e) => handleUpdateAction(index, "supply", Number(e.target.value))}
                className="block mt-1 py-1 w-full rounded-md bg-gray-800 text-white pl-1 overflow-auto"
              />
            </div>
            <div className="w-full flex flex-col">
              <textarea
                placeholder="Add instruction here..."
                value={action.instruction}
                onChange={(e) => handleUpdateAction(index, "instruction", e.target.value)}
                className="block mt-1 py-1 w-full rounded-md bg-gray-800 text-white pl-1 overflow-auto h-12"
              />
              {showValidationErrors && !action.instruction && (
                <p className="text-red-400 text-sm italic self-end">Instruction field cannot be empty</p>
              )}
            </div>
            {actions.length > minBuildOrderActions && (
              <div className="self-end">
                <button onClick={() => handleRemoveAction(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
          {showValidationErrors && action.clock && !clockRegex.test(action.clock) && (
            <p className="text-red-400 text-sm italic">Please add a valid clock value (mm:ss). The max value is (99:59)</p>
          )}
          {showValidationErrors && (action?.supply < 0 || action?.supply > maxSupply) && (
            <p className="text-red-400 text-sm italic">Supply must be between 0 and {maxSupply}</p>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <div
          onClick={(e) => {
            e.preventDefault();
            setActions([...actions, placeHolderAction]);
          }}
          className="hover:bg-indigo-800 bg-indigo-600 w-1/6 flex items-center self-end justify-center px-2 py-2 text-sm rounded mt-3 cursor-pointer "
        >
          <button className="font-medium cursor-pointer">Add Action</button>
        </div>
      </div>
    </div>
  );
};

const placeHolderAction: BuildOrderAction = {
  supply: 1,
  clock: "",
  instruction: "",
};

const initialState: BuildOrderAction[] = [placeHolderAction, placeHolderAction, placeHolderAction];

export const clockRegex = /^\d{0,2}:[0-5][0-9]$/;
