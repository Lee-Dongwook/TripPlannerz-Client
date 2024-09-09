import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import Comments from "@/pages/detail/Comments";
import MapAndTimeline from "@/pages/detail/MapAndTimeLine";
import RequestModal from "@/pages/detail/RequestModal";
import { type Comment } from "@/types/Comment";
import { type TripPlaceInfo } from "@/types/TripPlaceInfo";

// 목 데이터
const mockTripDetail = {
  title: "제주도 여행",
  startingDate: "2024-09-01",
  comingDate: "2024-09-07",
  content: "제주도의 아름다운 경치를 즐길 수 있는 여행입니다.",
  commentList: [
    {
      review: "정말 멋진 여행이었어요!",
      senderName: "김철수",
      postDate: "2024-09-08",
    },
    {
      review: "풍경이 너무 아름다웠습니다.",
      senderName: "이영희",
      postDate: "2024-09-09",
    },
  ],
  uuid: "mock-uuid-1234",
};

const mockUser = {
  name: "박지민",
};

const mockPlaces: TripPlaceInfo[] = [
  { name: "한라산", description: "높은 산", lat: 33.3, lng: 126.5 },
  { name: "섭지코지", description: "제주의 해변", lat: 33.4, lng: 126.8 },
  { name: "성산일출봉", description: "일출 명소", lat: 33.4587, lng: 126.9406 },
  {
    name: "천지연 폭포",
    description: "제주에서 가장 유명한 폭포",
    lat: 33.2505,
    lng: 126.5584,
  },
  {
    name: "만장굴",
    description: "세계 최대의 용암 동굴",
    lat: 33.5297,
    lng: 126.7682,
  },
  { name: "우도", description: "아름다운 섬", lat: 33.4996, lng: 126.9517 },
  {
    name: "돌하르방 공원",
    description: "제주의 상징 돌하르방이 있는 공원",
    lat: 33.4632,
    lng: 126.9029,
  },
];

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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

  // 목 데이터로 여행 상세 정보 가져오기
  useEffect(() => {
    // 서버 데이터 대신 목 데이터를 사용
    const data = mockTripDetail;
    setTitle(data.title);
    setStartingDate(data.startingDate);
    setComingDate(data.comingDate);
    setContent(data.content);
    setComments(data.commentList);
    setTripUuid(data.uuid);

    // 사용자 이름도 목 데이터 사용
    setUserName(mockUser.name);
  }, [id]);

  const handleOpenModal = () => setRequestAccompanyModal(true);
  const handleCloseModal = () => setRequestAccompanyModal(false);

  const handleAddComment = (review: string) => {
    if (review) {
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
            searchPlace={mockPlaces} // 목 데이터 사용
          />
        </div>

        {/* 경로 최적화 버튼 */}
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300"
            onClick={handleOpenModal}
          >
            동행 신청
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
