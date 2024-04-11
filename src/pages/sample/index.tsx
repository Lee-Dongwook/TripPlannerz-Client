import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "@/components/layout";
import { type RootState } from "@/store/store";

interface FormValues {
  title: string;
  capacity: number;
  closeRecruitDate: string;
  goingDate: string;
  comingDate: string;
  area: string;
  sigungu: string;
  tripImage: string[];
}

const Index = () => {
  const token = useSelector((state: RootState) => state.token.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [tripImage, setTripImage] = useState<FileList | null>(null);

  const onFormSubmit = handleSubmit(
    ({
      title,
      capacity,
      closeRecruitDate,
      goingDate,
      comingDate,
      area,
      sigungu,
    }) => {
      if (
        !tripImage ||
        !title ||
        !capacity ||
        !closeRecruitDate ||
        !goingDate ||
        !comingDate ||
        !area ||
        !sigungu
      ) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("image", tripImage[0]);
      formData.append(
        "contentsData",
        new Blob(
          [
            JSON.stringify({
              title,
              capacity,
              closeRecruitDate,
              goingDate,
              comingDate,
              area,
              sigungu,
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
          alert("여행이 생성되었습니다!");
          console.log(response);
          window.location.href = "/main";
        })
        .catch((error) => {
          alert("오류가 발생하였습니다.");
          console.error(error);
        });
    }
  );

  return (
    <Layout>
      <form onSubmit={onFormSubmit}>
        <input {...register("tripImage")} type="file" />
        {errors.tripImage && <p>여행 일정과 관련된 이미지가 필요합니다.</p>}

        <input
          {...register("title")}
          type="text"
          placeholder="여행 일정을 입력해주세요."
        />
        {errors.title && <p>여행 일정 제목이 필요합니다.</p>}

        <input
          {...register("capacity")}
          type="number"
          placeholder="동행할 인원 수를 지정해주세요."
        />
        {errors.capacity && <p>동행할 인원 수가 필요합니다.</p>}

        <input
          {...register("closeRecruitDate")}
          type="date"
          placeholder="모집 마감 날짜를 지정해주세요."
        />
        {errors.closeRecruitDate && <p>모집 마감 날짜가 필요합니다.</p>}

        <input
          {...register("goingDate")}
          type="date"
          placeholder="여행 시작 날짜를 입력해주세요."
        />
        {errors.goingDate && <p>여행 시작 날짜가 필요합니다.</p>}

        <input
          {...register("comingDate")}
          type="date"
          placeholder="여행 종료 날짜를 입력해주세요."
        />
        {errors.comingDate && <p>여행 종료 날짜가 필요합니다.</p>}

        <select {...register("area")}>
          <option value=""></option>
        </select>

        <select {...register("sigungu")}>
          <option value=""></option>
        </select>
      </form>
    </Layout>
  );
};

export default Index;
