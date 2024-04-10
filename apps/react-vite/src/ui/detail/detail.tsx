import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/common/modal';
import { RadioGroup, Radio } from '@/components/common/radio';
import KakaoMap from '@/lib/kakao/kakaoMap';

interface Place {
  name: string;
  x: string;
  y: string;
  tripUUID: string;
}

interface Comment {
  postDate: string;
  senderName: string;
  review: string;
}

function DetailPage() {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();
  const arr = location.pathname.split('/');

  const [title, setTitle] = useState('');

  const [startingDate, setStartingDate] = useState('');

  const [comingDate, setComingDate] = useState('');

  const [content, setContent] = useState('');

  const [review, setReview] = useState('');

  const [comments, setComments] = useState<Comment[]>([]);

  const [tripUuid, setTripUuid] = useState('');

  const [requestAccompanyModal, setRequestAccompanyModal] = useState(false);

  const [requestContent, setRequestContent] = useState('');

  const [userName, setUserName] = useState('');

  const [searchPlace, setSearchPlace] = useState<Place[]>([]);

  const [searchPlaceForOptimize, setSearchPlaceForOptimize] = useState<Place[]>([]);

  const [searchPlaceInput, setSearchPlaceInput] = useState('');

  const [optimizeModal, setOptimizeModal] = useState(false);

  const [startLocation, setStartLocation] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/trip/detail/${arr[2]}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setTripUuid(res.data.uuid);
        setTitle(res.data.title);
        setSearchPlaceInput(res.data.title);
        setStartingDate(res.data.startingDate);
        setComingDate(res.data.comingDate);
        setContent(res.data.content);
        setComments(res.data.commentList);
      });

    axios
      .get('http://localhost:8080/api/members/tripInfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserName(response.data.name);
      });
  }, []);

  useEffect(() => {
    if (tripUuid) {
      axios
        .get(`http://localhost:8080/api/getRoute?tripUUID=${tripUuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setSearchPlace(response.data);
        });
    }
  }, [tripUuid]);

  const handleOpenModal = () => {
    setRequestAccompanyModal(true);
  };

  const handleCloseModal = () => {
    setRequestAccompanyModal(false);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = () => {
    if (review) {
      const postToServer = {
        review: review,
        tripUUID: tripUuid,
      };

      axios
        .post(`http://localhost:8080/api/trip/postComment`, postToServer, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert('댓글이 등록되었습니다.');
          window.location.href = `/search/${arr[2]}`;
        })
        .catch(() => alert('댓글 등록에 오류가 발생하였습니다.'));
    }
  };

  function keyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddComment();
      setReview('');
    }
  }

  const handleRequestContent = (event) => {
    setRequestContent(event.target.value);
  };

  const handleRequestAccompany = () => {
    const postToServer = {
      review: requestContent,
      tripUUID: tripUuid,
    };

    axios
      .post(`http://localhost:8080/api/trip/requestAccompany`, postToServer, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('동행 신청이 완료되었습니다.');
      })
      .catch(() => alert('동행 신청에 오류가 발생하였습니다.'));
  };

  const handleSearchInput = (event) => {
    setSearchPlaceInput(event.target.value);
  };

  const handleUpdateSearchInput = () => {
    const latitude = localStorage.getItem('latitude');

    const postToServer = {
      name: searchPlaceInput,
      x: latitude!.split(',')[0],
      y: latitude!.split(',')[1],
      tripUUID: tripUuid,
    };

    if (searchPlaceInput) {
      axios
        .post('http://localhost:8080/api/saveLocation', postToServer, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => console.log(res));

      setSearchPlace([
        ...searchPlace,
        {
          name: searchPlaceInput,
          x: latitude!.split(',')[0],
          y: latitude!.split(',')[1],
          tripUUID: tripUuid,
        },
      ]);
    }
    setSearchPlaceInput('');
  };

  const timeLineItem =
    searchPlace.length > 0
      ? searchPlace.map((item) => ({
          children: item.name,
        }))
      : null;

  const handleChangeTimeLineItem = async () => {
    const originalOrder = [...searchPlace];
    if (originalOrder.length < 2) {
      alert('2개 이상의 경로를 입력해주세요');
      window.location.href = `/search/${arr[2]}`;
    }

    setSearchPlaceForOptimize(originalOrder);
    setOptimizeModal(true);
  };

  const handleCloseOptimizeModal = () => {
    setOptimizeModal(false);
  };

  const handleSaveStartLocation = (event) => {
    setStartLocation(event.target.value);
  };

  const sendStartLocationToServer = async () => {
    const postToServer = {
      name: startLocation,
      tripUUID: tripUuid,
    };

    await axios
      .post('http://localhost:8080/api/optimizeRoute', postToServer, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const totalDuration = res.data.totalDuration;
        console.log(totalDuration);
        if (totalDuration) {
          alert(`총 예상 이동 시간은 ${totalDuration}분 입니다.`);
          setOptimizeModal(false);
        }
      });
  };

  const handleDeleteCertainComment = (index) => {
    const newComment = comments.filter((_, idx) => idx !== index);
    setComments(newComment);

    alert('댓글이 삭제되었습니다.');

    window.location.href = `/search/${arr[2]}`;
  };

  return (
    <div className='bg-white shadow rounded-lg p-4 flex flex-col'>
      <h3 className='text-center'>{title}</h3>
      <h5 className='text-center'>
        여행 기간:{' '}
        {startingDate < comingDate
          ? `${startingDate} ~ ${comingDate}`
          : `${comingDate} ~ ${startingDate}`}
      </h5>
      <h5 className='text-center'>내용: {content || '예시 여행입니다.'}</h5>
      <hr />
      <table>
        <td>
          <KakaoMap searchKeyword={searchPlaceInput} />
        </td>
        <td>
          <h4>
            <strong>TimeLine</strong>
            <div className='flex flex-col relative'>
              <div className='flex relative pl-4'>
                {timeLineItem &&
                  timeLineItem.map((_, idx) => {
                    return (
                      <>
                        <div className='w-4 h-4 bg-blue-500 rounded-full mt-1 -left-2.5 absolute'></div>
                        <div className='ml-4' key={idx}></div>
                      </>
                    );
                  })}
              </div>
            </div>
          </h4>
        </td>
      </table>

      <button onClick={handleChangeTimeLineItem}>경로 최적화</button>
      <Modal show={optimizeModal} onHide={handleCloseOptimizeModal}>
        <ModalHeader>
          <ModalTitle>시작점 선택</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {optimizeModal && (
            <RadioGroup>
              {searchPlaceForOptimize.map((searchPlace, index) => (
                <div key={index} className='mb-2'>
                  <Radio
                    value={searchPlace.name}
                    onChange={handleSaveStartLocation}
                    checkedValue={startLocation}
                  >
                    {searchPlace.name}
                  </Radio>
                </div>
              ))}
            </RadioGroup>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            onClick={sendStartLocationToServer}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            확인
          </button>
        </ModalFooter>
      </Modal>

      <button onClick={handleOpenModal}>동행 신청</button>

      <Modal show={requestAccompanyModal} onHide={handleCloseModal}>
        <ModalHeader>
          <ModalTitle>동행 신청</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <input
            type='textarea'
            placeholder='신청서를 작성해주세요'
            onChange={handleRequestContent}
          />
          <button onClick={handleRequestAccompany}>신청하기</button>
        </ModalBody>
      </Modal>
      <div>
        <h3>여행 장소</h3>
        <input placeholder='여행장소를 입력하세요' onChange={handleSearchInput} />
        <button onClick={handleUpdateSearchInput}>입력</button>
      </div>

      <input value={review} onChange={handleReviewChange} onKeyDown={keyDown} />
      <button onClick={handleAddComment}>댓글 추가</button>
      {comments.length === 0
        ? ''
        : comments.map((comment, index) => (
            <div>
              <>
                <p>날짜: {comment.postDate}</p>
                <p>글쓴이: {comment.senderName}</p>
                <p>댓글: {comment.review}</p>
              </>
              {comment.senderName === userName ? (
                <button onClick={() => handleDeleteCertainComment(index)}>삭제</button>
              ) : (
                ''
              )}
            </div>
          ))}
    </div>
  );
}

export default DetailPage;
