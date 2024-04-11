import React, { useEffect } from "react";
import {
  majorCategories,
  minorCategories,
  subCategories,
} from "@/lib/info/tripCatergoryList";

interface SelectPlaceComponentProps {
  selectedMajor: string;
  setSelectedMajor: (value: string) => void;
  selectedMinor: string;
  setSelectedMinor: (value: string) => void;
  minorOptions: string[];
  setMinorOptions: (options: string[]) => void;
  subOptions: string[];
  setSubOptions: (options: string[]) => void;
}

const SelectPlaceComponent: React.FC<SelectPlaceComponentProps> = ({
  minorOptions,
  subOptions,
  setMinorOptions,
  setSubOptions,
  selectedMajor,
  selectedMinor,
  setSelectedMajor,
  setSelectedMinor,
}) => {
  useEffect(() => {
    if (selectedMajor) {
      setMinorOptions(minorCategories[selectedMajor] || []);
    }
  }, [selectedMajor, setMinorOptions]);

  useEffect(() => {
    if (selectedMinor) {
      setSubOptions(subCategories[selectedMinor] || []);
    }
  }, [selectedMinor, setSubOptions]);

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8">
      <h1 className="font-bold text-xl mb-4">여행 장소 선택</h1>
      <p className="text-gray-700 text-base mb-2">
        방문하실 여행 장소를 선택합니다.
      </p>
      <select
        className="block w-full mt-3"
        onChange={(e) => setSelectedMajor(e.target.value)}
      >
        <option value="">대분류 선택</option>
        {majorCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className="block w-full mt-3"
        onChange={(e) => setSelectedMinor(e.target.value)}
        disabled={!selectedMajor}
      >
        <option value="">중분류 선택</option>
        {minorOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select className="block w-full mt-3" disabled={!selectedMinor}>
        <option value="">소분류 선택</option>
        {subOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPlaceComponent;
