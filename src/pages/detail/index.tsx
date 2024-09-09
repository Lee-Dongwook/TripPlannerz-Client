import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <>
      <div className="bg-white shadow rounded-lg p-8 space-y-8">
        {/* Trip Details Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-md text-gray-600">
            여행 기간: {`${startingDate} ~ ${comingDate}`}
          </p>
          <p className="text-md text-gray-600">
            내용: {content || "No details provided."}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Map and Timeline Section */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <MapAndTimeline
            searchPlaceInput={searchPlaceInput}
            searchPlace={searchPlace}
          />
        </div>

        {/* 경로 최적화 버튼 */}
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300"
            onClick={handleOpenModal}
          >
            경로 최적화
          </button>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">댓글</h4>
          <Comments
            comments={comments}
            userName={userName}
            onDelete={handleDeleteComment}
          />
        </div>
      </div>

      {/* Request Modal */}
      <RequestModal
        isOpen={requestAccompanyModal}
        onClose={handleCloseModal}
        onSubmit={handleAddComment}
      />
    </>
  );
};

export default DetailPage;
