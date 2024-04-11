import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "@/components/layout";

const index = () => {
  const token = useSelector((state: any) => state.token.token);

  const { register, handleSubmit } = useForm();

  const [title, setTitle] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [closeRecruitDate, setCloseRecruitDate] = useState("");
  const [goingDate, setGoingDate] = useState("");
  const [comingDate, setComingDate] = useState("");
  const [area, setArea] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [tripImage, setTripImage] = useState<any[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event);
  };

  const handleCloseRecruitDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCloseRecruitDate(event.target.value);
  };

  const handleGoingDate = (event) => {
    setGoingDate(event);
  };

  const handleComingDate = (event) => {
    setComingDate(event);
  };

  const handleTripImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(
        0,
        5 - tripImage.length
      );

      const newImageFilesWithPreview = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setTripImage((prevImage) => [...prevImage, ...newImageFilesWithPreview]);
    }
  };

  const onSubmit = () => {
    const contentsData = {
      title,
      capacity,
      closeRecruitDate,
      goingDate,
      comingDate,
      area,
      sigungu,
    };

    const formData = new FormData();
    formData.append("image", tripImage[0].originFileObj);
    formData.append(
      "contentsData",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

    axios.post("http://localhost:8080/api/trip/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" onChange={handleTitleChange} />
        <input type="number" onChange={handleCapacityChange} />
        <input type="file" onChange={handleTripImageChange} />
      </form>
    </Layout>
  );
};

export default index;
