import React, { FC } from "react";

type GameModeSelectionProps = {
  onChange: (faction: string) => void;
  gameModes: { [key: number]: string };
  testId: string;
  selectedValue?: string;
  placeholder?: string;
  className?: string;
};

export const GameModeSelection: FC<GameModeSelectionProps> = ({ onChange, gameModes, selectedValue, placeholder, testId, className }) => {
  return (
    <select data-testid={testId} value={selectedValue} onChange={(e) => onChange(e.target.value)} placeholder="Player Faction" className={className}>
      <option key={"a"} value={""}>
        {placeholder || "Any mode"}
      </option>
      {Object.entries(gameModes)
        .filter(([key, value]) => value !== "All")
        .map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
    </select>
  );
};
