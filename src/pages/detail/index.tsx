import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "@/components/layout";
import Comments from "@/pages/detail/Comments";
import MapAndTimeline from "@/pages/detail/MapAndTimeLine";
import RequestModal from "@/pages/detail/RequestModal";
import { type Comment } from "@/types/Comment";
import { type TripPlaceInfo } from "@/types/TripPlaceInfo";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: any) => state.token.token);

  const [title, setTitle] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [comingDate, setComingDate] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [tripUuid, setTripUuid] = useState("");
  const [requestAccompanyModal, setRequestAccompanyModal] = useState(false);
  const [searchPlace, setSearchPlace] = useState<TripPlaceInfo[]>([]);
  const [searchPlaceInput, setSearchPlaceInput] = useState("");
  const [userName, setUserName] = useState("");

  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/trip/detail/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const data = response.data;
      setTitle(data.title);
      setStartingDate(data.startingDate);
      setComingDate(data.comingDate);
      setContent(data.content);
      setComments(data.commentList);
      setTripUuid(data.uuid);
    };

    fetchTripDetails();
  }, [id, token]);

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/members/tripInfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserName(response.data.name);
    };

    fetchUserName();
  }, [token]);

  const handleOpenModal = () => setRequestAccompanyModal(true);
  const handleCloseModal = () => setRequestAccompanyModal(false);

  const handleAddComment = async (review: string) => {
    if (review) {
      await axios.post(
        `http://localhost:8080/api/trip/postComment`,
        {
          review,
          tripUuid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([
        ...comments,
        { review, senderName: userName, postDate: new Date().toISOString() },
      ]);
    }
  };

  const handleDeleteComment = (index: number) => {
    setComments(comments.filter((_, idx) => idx !== index));
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-4 flex flex-col">
        <h3 className="text-center">{title}</h3>
        <h5 className="text-center">
          여행 기간: {`${startingDate} ~ ${comingDate}`}
        </h5>
        <h5 className="text-center">
          내용: {content || "No details provided."}
        </h5>
        <hr />
        <MapAndTimeline
          searchPlaceInput={searchPlaceInput}
          searchPlace={searchPlace}
        />
        <button onClick={() => setRequestAccompanyModal(true)}>
          경로 최적화
        </button>
        <RequestModal
          isOpen={requestAccompanyModal}
          onClose={() => setRequestAccompanyModal(false)}
          onSubmit={handleAddComment}
        />
        <Comments
          comments={comments}
          userName={userName}
          onDelete={handleDeleteComment}
        />
      </div>
    </Layout>
  );
};

export default DetailPage;
