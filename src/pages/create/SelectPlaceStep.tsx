import React from "react";
import SelectPlaceComponent from "./SelectPlaceComponent";

interface SelectPlaceStepProps {
  selectedMajor: string;
  setSelectedMajor: React.Dispatch<React.SetStateAction<string>>;
  selectedMinor: string;
  setSelectedMinor: React.Dispatch<React.SetStateAction<string>>;
  minorOptions: string[];
  setMinorOptions: React.Dispatch<React.SetStateAction<string[]>>;
  subOptions: string[];
  setSubOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectPlaceStep: React.FC<SelectPlaceStepProps> = ({
  selectedMajor,
  setSelectedMajor,
  selectedMinor,
  setSelectedMinor,
  minorOptions,
  setMinorOptions,
  subOptions,
  setSubOptions,
}) => {
  return (
    <SelectPlaceComponent
      selectedMajor={selectedMajor}
      setSelectedMajor={setSelectedMajor}
      selectedMinor={selectedMinor}
      setSelectedMinor={setSelectedMinor}
      minorOptions={minorOptions}
      setMinorOptions={setMinorOptions}
      subOptions={subOptions}
      setSubOptions={setSubOptions}
    />
  );
};

export default SelectPlaceStep;
