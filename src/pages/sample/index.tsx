import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Layout from "@/components/layout";
import { RootState } from "@/store/store";
import {
  majorCategories,
  minorCategories,
  subCategories,
} from "@/lib/info/tripCatergoryList";

interface CustomFile extends File {
  uid: string;
}

interface FormValues {
  title: string;
  capacity: number;
  closeRecruitDate: string;
  goingDate: string;
  comingDate: string;
  area: string;
  sigungu: string;
  tripImage: CustomFile[];
}

const CreatePage: React.FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tripImage: [],
    },
  });

  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  const tripImageFiles = watch("tripImage"); // Watch the tripImage array

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray: CustomFile[] = Array.from(event.target.files).map(
        (file) => ({
          ...file,
          uid: `rc-upload-${Date.now()}-${file.name}`,
        })
      );

      setValue("tripImage", fileArray);
    }
  };

  const onMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedMajor(value);
    setValue("area", "");
    setValue("sigungu", "");
  };

  const onAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedArea(value);
    setValue("sigungu", "");
  };

  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.tripImage.length) {
      alert("일정을 대표하는 이미지를 등록해주세요.");
      return;
    }

    const formData = new FormData();
    data.tripImage.forEach((file) => {
      formData.append("image", file, file.name);
    });

    formData.append(
      "contentsData",
      new Blob(
        [
          JSON.stringify({
            title: data.title,
            capacity: data.capacity,
            closeRecruitDate: data.closeRecruitDate,
            goingDate: data.goingDate,
            comingDate: data.comingDate,
            area: data.area,
            sigungu: data.sigungu,
          }),
        ],
        { type: "application/json" }
      )
    );

    axios
      .post("http://localhost:8080/api/trip/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("여행이 생성되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
        console.error(error);
      });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="file" multiple onChange={onImageChange} accept="image/*" />
        {tripImageFiles.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ width: "100px", height: "100px" }}
          />
        ))}
        {errors.tripImage && <p>여행 일정 이미지가 필요합니다.</p>}

        <input
          {...register("title")}
          type="text"
          placeholder="여행 일정 제목을 지정해주세요."
        />
        {errors.title && <p>여행 일정 제목이 필요합니다.</p>}

        <input
          {...register("capacity")}
          type="number"
          placeholder="여행 일정의 인원 수를 지정해주세요."
        />
        {errors.capacity && <p>여행 일정의 인원 수가 필요합니다.</p>}

        <input
          {...register("closeRecruitDate")}
          type="date"
          placeholder="여행 모집 마감 날짜를 지정해주세요."
        />
        {errors.closeRecruitDate && <p>여행 모집 마감 날짜를 지정해주세요.</p>}

        <input
          {...register("goingDate")}
          type="date"
          placeholder="여행 시작 날짜를 지정해주세요."
        />
        {errors.goingDate && <p>여행 시작 날짜를 지정해주세요.</p>}

        <input
          {...register("comingDate")}
          type="date"
          placeholder="여행 종료 날짜를 지정해주세요."
        />
        {errors.comingDate && <p>여행 종료 날짜를 지정해주세요.</p>}

        <select onChange={onMajorChange} defaultValue="">
          <option value="">대분류를 선택해주세요. (특별시/광역시/도)</option>
          {majorCategories.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>

        <select {...register("area")} onChange={onAreaChange}>
          <option value="">중분류를 선택해주세요.</option>
          {selectedMajor &&
            minorCategories[selectedMajor]?.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
        </select>

        <select {...register("sigungu")}>
          <option value="">소분류를 선택해주세요.</option>
          {selectedArea &&
            subCategories[selectedArea]?.map((sigungu) => (
              <option key={sigungu} value={sigungu}>
                {sigungu}
              </option>
            ))}
        </select>

        <button type="submit">여행 일정 등록</button>
      </form>
    </Layout>
  );
};

export default CreatePage;
