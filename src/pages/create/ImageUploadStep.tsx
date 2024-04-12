// src/components/steps/ImageUploadStep.tsx
import React from "react";

interface ImageUploadStepProps {
  image: any[];
  handleTripImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadStep: React.FC<ImageUploadStepProps> = ({
  image,
  handleTripImageChange,
}) => {
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8">
      <h1 className="font-bold text-xl mb-4">여행 사진 업로드</h1>
      <p className="text-gray-700 text-base mb-4">
        해당 여행 일정을 대표하는 사진을 올려 다른 사용자들이 확인 할 수 있게
        합니다.
      </p>
      <div className="flex justify-center">
        {image.length < 5 && (
          <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-100 p-4">
            <p className="text-gray-400">+ Upload</p>
            <input
              type="file"
              multiple
              onChange={handleTripImageChange}
              className="opacity-0 absolute"
              accept="image/*"
            />
          </label>
        )}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {image.map((img, idx) => (
            <img
              key={idx}
              src={img.preview}
              alt={`preview ${idx}`}
              className="max-w-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadStep;
