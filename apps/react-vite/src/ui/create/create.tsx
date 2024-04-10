import { type ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Trip } from '@/types/TripList';
import { updateTripInfo } from '@/application/navbar/updateTripInfo';
import { SubmitTripInfoToServer } from '@/application/navbar/submitTripInfoToServer';
import { majorCategories, minorCategories, subCategories } from '@/lib/info/tripCatergoryList';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface ImageFileWithPreview {
  file: File;
  preview: string;
}

function CreatePage() {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token.token);
  const totalSteps = 8;

  const [tripInfo, setTripInfo] = useState<Trip>({});
  const [image, setImage] = useState<ImageFileWithPreview[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [createSuccessState, setCreateSucessState] = useState<boolean>(false);

  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedMinor, setSelectedMinor] = useState('');
  const [minorOptions, setMinorOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    if (selectedMajor) {
      setMinorOptions(minorCategories[selectedMajor] || []);
    }
  }, [selectedMajor]);

  useEffect(() => {
    if (selectedMinor) {
      setSubOptions(subCategories[selectedMinor] || []);
    }
  }, [selectedMinor]);

  const handleStepChangeToPrev = () => {
    if (currentStep === 0) {
      alert('처음 부분입니다.');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChangeToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleTripTitleChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'title', event.target.value));
  };

  const handleTripImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(0, 5 - image.length);

      const newImageFilesWithPreview = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImage((prevImages) => [...prevImages, ...newImageFilesWithPreview]);
    }
  };

  const handleTripRecruitNumChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'recruitNum', event));
  };
  const handleTripCloseRecruitDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'closeRecruitDate', event));
  };
  const handleTripGoingDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'startingDate', event));
  };
  const handleTripComingDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'comingDate', event));
  };

  const renderStepContent = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8'>
            <h1 className='font-bold text-xl mb-4'>여행 장소 선택</h1>
            <p className='text-gray-700 text-base mb-2'>방문하실 여행 장소를 선택합니다.</p>
            <select
              className='block w-full mt-3'
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value=''>대분류 선택</option>
              {majorCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className='block w-full mt-3'
              onChange={(e) => setSelectedMinor(e.target.value)}
              disabled={!selectedMajor}
            >
              <option value=''>중분류 선택</option>
              {minorOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select className='block w-full mt-3' disabled={!selectedMinor}>
              <option value=''>소분류 선택</option>
              {subOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        );

      case 1:
        return (
          <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8'>
            <h1 className='font-bold text-xl mb-4'>여행 사진 업로드</h1>
            <p className='text-gray-700 text-base mb-4'>
              해당 여행 일정을 대표하는 사진을 올려 다른 사용자들이 확인 할 수 있게 합니다.
            </p>
            <div className='flex justify-center'>
              {image.length < 5 && (
                <label className='cursor-pointer flex flex-col items-center justify-center bg-gray-100 p-4'>
                  <p className='text-gray-400'>+ Upload</p>
                  <input
                    type='file'
                    multiple
                    onChange={handleTripImageChange}
                    className='opacity-0 absolute'
                    accept='image/*'
                  />
                </label>
              )}
              <div className='flex flex-wrap justify-center gap-4 mt-4'>
                {image.map((img, idx) => (
                  <img key={idx} src={img.preview} alt={`preview ${idx}`} className='max-w-xs' />
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
      case 3:
        return (
          <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8'>
            <h1 className='font-bold text-xl mb-4'>
              {currentStep === 2 ? '3. 여행 제목' : '4. 모집 인원 수'}
            </h1>
            <p className='text-gray-700 text-base mb-4'>
              {currentStep === 2
                ? '해당 여행 일정의 제목을 작성해주세요.'
                : '해당 여행 일정에 함께할 인원 수를 제한하여 주세요.'}
            </p>
            <div className='flex justify-center'>
              {currentStep === 2 ? (
                <input
                  type='text'
                  className='input input-bordered w-48'
                  onChange={handleTripTitleChange}
                />
              ) : (
                <div className='flex items-center'>
                  <UserCircleIcon className='w-5 h-5 mr-2 text-gray-500' />
                  <input
                    type='number'
                    className='input input-bordered'
                    min={1}
                    max={10}
                    onChange={(e) => handleTripRecruitNumChange(Number(e.target.value))}
                    placeholder='명'
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
      case 5:
      case 6:
        return (
          <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white p-8'>
            <h1 className='font-bold text-xl mb-4'>
              {currentStep === 4
                ? '5. 모집 마감날짜'
                : currentStep === 5
                  ? '6. 여행 시작 날짜'
                  : '7. 여행 종료 날짜'}
            </h1>
            <p className='text-gray-700 text-base mb-4'>
              {currentStep === 4
                ? '동행할 인원 모집의 마감 날짜를 정해주세요.'
                : currentStep === 5
                  ? '해당 여행 일정의 시작 날짜를 정해주세요.'
                  : '해당 여행 일정의 종료 날짜를 정해주세요.'}
            </p>
            <div className='flex justify-center'>
              <input
                type='date'
                onChange={(e) => {
                  const dateString = e.target.value;
                  if (currentStep === 4) {
                    handleTripCloseRecruitDateChange(dateString);
                  } else if (currentStep === 5) {
                    handleTripGoingDateChange(dateString);
                  } else {
                    handleTripComingDateChange(dateString);
                  }
                }}
                className='input input-bordered'
                placeholder={
                  currentStep === 4
                    ? '모집 마감 날짜'
                    : currentStep === 5
                      ? '가는 날 선택'
                      : '오는 날 선택'
                }
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg my-5 bg-white'>
            <h1 className='font-bold text-xl mb-4'>여행 등록</h1>
            <p className='text-gray-700 text-base'>생성할 여행 일정의 정보들을 확인합니다.</p>
            <hr className='my-4' />
            <p className='text-gray-700 text-base'>여행 제목: {tripInfo.title}</p>
            <p className='text-gray-700 text-base'>
              여행 장소: {tripInfo.area} {tripInfo.sigungu}
            </p>
            <p className='text-gray-700 text-base'>모집 인원 수: {tripInfo.recruitNum}</p>
            <p className='text-gray-700 text-base'>
              모집 마감 날짜: {new Date(tripInfo.closeRecruitDate!).toLocaleDateString()}
            </p>
            <p className='text-gray-700 text-base'>
              여행 날짜: {new Date(tripInfo.startingDate!).toLocaleDateString()}~
              {new Date(tripInfo.comingDate!).toLocaleDateString()}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmitTripInfoToServer = async () => {
    const response = await SubmitTripInfoToServer(token, image, tripInfo);

    if (response) {
      setCreateSucessState(true);
    } else {
      alert('여행 생성에 오류가 발생하였습니다.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {createSuccessState ? (
        <div className='text-center p-4'>
          <div className='text-green-500 text-xl font-bold'>{`${tripInfo.title} 여행 일정이 생성되었습니다!`}</div>
          <div className='text-gray-700 mt-2'>동행자들을 모집하고, 즐거운 여행 되세요!</div>
          <button
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => navigate('/main')}
          >
            Home
          </button>
        </div>
      ) : (
        <div>
          <div className='flex justify-center p-4'>
            <div>Step {currentStep + 1} of X</div>
          </div>
          <div>{renderStepContent(currentStep)}</div>
          <div className='flex justify-center space-x-2 mt-4'>
            {currentStep < 7 && (
              <>
                {currentStep > 0 && (
                  <button
                    className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
                    onClick={handleStepChangeToPrev}
                  >
                    이전
                  </button>
                )}
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                  onClick={handleStepChangeToNext}
                >
                  다음
                </button>
              </>
            )}
            {currentStep === 7 && (
              <>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
                  onClick={handleStepChangeToPrev}
                >
                  이전
                </button>
                <button
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r'
                  onClick={handleSubmitTripInfoToServer}
                >
                  등록
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePage;
