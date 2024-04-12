import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Trip } from "@/types/TripList";
import {
  majorCategories,
  minorCategories,
  subCategories,
} from "@/lib/info/tripCatergoryList";
import { postTripInfo } from "@/services/postTripInfo";

import ImageUploadStep from "./ImageUploadStep";
import SelectPlaceStep from "./SelectPlaceStep";

function CreatePage() {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token.token);

  const [tripInfo, setTripInfo] = useState<Trip>({});
  const [image, setImage] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedMinor, setSelectedMinor] = useState("");
  const [minorOptions, setMinorOptions] = useState<string[]>([]);
  const [subOptions, setSubOptions] = useState<string[]>([]);

  const handleStepChangeToPrev = () =>
    currentStep > 0 && setCurrentStep(currentStep - 1);
  const handleStepChangeToNext = () =>
    currentStep < 7 && setCurrentStep(currentStep + 1);

  const handleTripImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const files = Array.from(event.target.files).slice(0, 5 - image.length);
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImage((prev) => [...prev, ...newImages]);
    }
  };

  const handleInputChanges = (key: keyof Trip, value: any) => {
    setTripInfo((prev) => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectPlaceStep
            {...{
              selectedMajor,
              setSelectedMajor,
              selectedMinor,
              setSelectedMinor,
              minorOptions,
              setMinorOptions,
              subOptions,
              setSubOptions,
            }}
          />
        );
      case 1:
        return (
          <ImageUploadStep
            image={image}
            handleTripImageChange={handleTripImageChange}
          />
        );
      default:
        return <div>Other Steps...</div>; // Placeholder for other steps
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    image.forEach((img) => formData.append("images", img.file));
    formData.append("tripInfo", JSON.stringify(tripInfo));

    const response = await postTripInfo(token, formData);
    if (response) {
      navigate("/main");
    } else {
      alert("Failed to create the trip.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center p-4">
        <div>{`Step ${currentStep + 1} of 8`}</div>
        {renderStepContent()}
        <div className="flex justify-center space-x-2 mt-4">
          {currentStep > 0 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={handleStepChangeToPrev}
            >
              Prev
            </button>
          )}
          {currentStep < 7 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleStepChangeToNext}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
