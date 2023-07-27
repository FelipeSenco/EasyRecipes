import React, { FC } from "react";
type FactionSelectionProps = {
  onChange: (faction: string) => void;
  gameFactions: { [key: number]: string };
  testId: string;
  selectedValue?: string;
  placeholder?: string;
  className?: string;
};

export const FactionSelection: FC<FactionSelectionProps> = ({ onChange, gameFactions, selectedValue, placeholder, testId, className }) => {
  return (
    <select data-testid={testId} value={selectedValue} onChange={(e) => onChange(e.target.value)} placeholder="Player Faction" className={className}>
      <option key={"a"} value={""}>
        {placeholder || "Any faction"}
      </option>
      {Object.entries(gameFactions)
        .filter(([key, value]) => value !== "All")
        .map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
    </select>
  );
};
