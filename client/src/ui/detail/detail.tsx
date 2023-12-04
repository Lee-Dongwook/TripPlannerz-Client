import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Form, Card, Modal } from 'react-bootstrap';
import { Input, Radio, Space, Timeline } from 'antd';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { getDetailTripRoute } from '@/application/api/detail/getDetailTripRoute';
import { getMemberTripInfo } from '@/application/api/detail/getMemberTripInfo';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';
import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';
import { postStartLocationToServer } from '@/application/api/detail/postStartLocationToServer';
import { Trip } from '@/domain/TripList';

function DetailPage() {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();
  const arr = location.pathname.split('/');

  const [detailTripInfo, setDetailTripInfo] = useState<Trip>({});
  const [memberNum, setMemberNum] = useState<number>(0);
  const [memberList, setMemberList] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [searchPlace, setSearchPlace] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [review, setReview] = useState(''); //댓글의 실제 내용
  const [requestAccompanyModal, setRequestAccompanyModal] = useState(false);
  const [requestContent, setRequestContent] = useState(''); // 동행 신청 내용
  const [searchPlaceForOptimize, setSearchPlaceForOptimize] = useState([]);
  const [searchPlaceInput, setSearchPlaceInput] = useState('');
  const [optimizeModal, setOptimizeModal] = useState(false);
  const [startLocation, setStartLocation] = useState('');

  const handleGetDetailTripInfo = async () => {
    const response = await getDetailTripInfo(token, arr);

    if (response.data) {
      const receivedTripInfo: Record<keyof Trip, any> = {
        id: response.data.id,
        uuid: response.data.uuid,
        title: response.data.title,
        content: response.data.content,
        goingDate: response.data.startingDate,
        comingDate: response.data.comingDate,
      };

      setDetailTripInfo((prevInfo) => ({
        ...prevInfo,
        ...receivedTripInfo,
      }));

      setMemberNum(response.data.memberNum);
      setMemberList(response.data.memberList);
      setComments(response.data.commentList);
    }
  };

  const handleGetMemberTripInfo = async () => {
    const response = await getMemberTripInfo(token);

    if (response.data) {
      setUserName(response.data.name);
    }
  };

  const handleGetDetailTripRoute = async () => {
    if (detailTripInfo.uuid) {
      const response = await getDetailTripRoute(token, detailTripInfo.uuid);

      if (response.data) {
        setSearchPlace(response.data);
      }
    }
  };

  useEffect(() => {
    handleGetDetailTripInfo();
    handleGetMemberTripInfo();
    handleGetDetailTripRoute();
  }, [detailTripInfo.uuid]);

  const handleOpenModal = () => {
    setRequestAccompanyModal(true);
  };

  const handleCloseModal = () => {
    setRequestAccompanyModal(false);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = async () => {
    if (review) {
      setRecoilComment(review);

      const postToServer = {
        review: review,
        tripUUID: tripUuid,
      };

      const response = await postCommentToServer(token, postToServer);

      //   axios.post(`http://localhost:8080/api/trip/postComment`,postToServer,{
      //    headers: {'Authorization': `Bearer ${token}`}
      //  }).then((res) => {
      //   alert("댓글이 등록되었습니다.")
      //   window.location.href=`/search/${arr[2]}`
      //  }).catch((res) => alert('댓글 등록에 오류가 발생하였습니다.'))
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

  const handleRequestAccompany = async () => {
    const postToServer = {
      review: requestContent,
      tripUUID: tripUuid,
    };

    const response = await postRequestAccompanyToServer(token, postToServer);

    // axios.post(`http://localhost:8080/api/trip/requestAccompany`, postToServer, {
    //   headers: {'Authorization': `Bearer ${token}`}
    // }).then((res) => {
    //   alert("동행 신청이 완료되었습니다.")
    // }).catch((res) => alert('동행 신청에 오류가 발생하였습니다.'))
  };

  const handleSearchInput = (event) => {
    setSearchPlaceInput(event.target.value);
  };

  const handleUpdateSearchInput = async () => {
    const latitude = localStorage.getItem('latitude');

    const postToServer = {
      name: searchPlaceInput,
      x: latitude.split(',')[0],
      y: latitude.split(',')[1],
      tripUUID: tripUuid,
    };

    if (searchPlaceInput) {
      const response = await postTripLocationToServer(token, postToServer);
      //   setSearchPlace([...searchPlace, {
      //     name: searchPlaceInput,
      //     x: latitude.split(',')[0],
      //     y: latitude.split(',')[1],
      //     tripUUID: tripUuid
      //   }])
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

    const response = await postStartLocationToServer(token, postToServer);

    // await axios.post('http://localhost:8080/api/optimizeRoute',postToServer, {
    //   headers: {'Authorization': `Bearer ${token}`}
    // }).then((res) => {
    //   const totalDuration = res.data.totalDuration;
    //   console.log(totalDuration)
    //   if(totalDuration){
    //     alert(`총 예상 이동 시간은 ${totalDuration}분 입니다.`);
    //     setOptimizeModal(false);
    //   }
    // })
  };

  const handleDeleteCertainComment = (index) => {
    const newComment = comments.filter((comment, idx) => idx !== index);
    setComments(newComment);

    alert('댓글이 삭제되었습니다.');

    window.location.href = `/search/${arr[2]}`;
  };

  return (
    <div>
      <Card>
        <Card.Body
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Kakao
            width='400px'
            height='400px'
            searchKeyword={searchPlaceInput}
          />
          <div
            className='CardInfo'
            style={{
              borderRadius: '10px',
              border: '2px solid skyblue',
              maxHeight: '750px',
              overflowY: 'auto',
              marginLeft: '20px',
              flex: '1',
            }}
          >
            <br />
            <h3>{title}</h3>
            <br />
            <h5>
              여행 기간 :{' '}
              {startingDate < comingDate
                ? `${startingDate} ~ ${comingDate}`
                : `${comingDate} ~ ${startingDate}`}
            </h5>
            <br />
            <h5>내용: {content ? content : '예시 여행입니다.'} </h5>
            <br />
            <div
              style={{
                textAlign: 'center',
                minHeight: '250px',
                maxHeight: '250px',
                overflowY: 'auto',
                border: '4px solid skyblue',
                borderRadius: '10px',
              }}
            >
              <h4 style={{ padding: '5px' }}>
                <strong>TimeLine</strong>
              </h4>
              <hr />
              <Timeline mode='alternate'>
                {timeLineItem &&
                  timeLineItem.map((item, index) => (
                    <Timeline.Item key={index}>{item.children}</Timeline.Item>
                  ))}
              </Timeline>
            </div>
            <table>
              <td>
                <Button
                  style={{
                    width: '200px',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                  onClick={handleChangeTimeLineItem}
                >
                  경로 최적화
                </Button>
                <Modal show={optimizeModal} onHide={handleCloseOptimizeModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>시작점 선택</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {optimizeModal && (
                      <Radio.Group
                        onChange={handleSaveStartLocation}
                        value={startLocation}
                      >
                        {searchPlaceForOptimize.map((searchPlace, index) => (
                          <Space direction='vertical' key={index}>
                            <Radio value={searchPlace.name}>
                              {searchPlace.name}
                            </Radio>
                          </Space>
                        ))}
                      </Radio.Group>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={sendStartLocationToServer}>확인</Button>
                  </Modal.Footer>
                </Modal>
              </td>
              <td style={{ padding: '75px' }}>
                <Button
                  style={{
                    width: '200px',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                  onClick={handleOpenModal}
                >
                  동행 신청
                </Button>
              </td>
            </table>
          </div>
          <Modal show={requestAccompanyModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>동행 신청</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Control
                  type='textarea'
                  style={{ height: '300px' }}
                  placeholder='신청서를 작성해주세요'
                  onChange={handleRequestContent}
                />
                <Button onClick={handleRequestAccompany}>신청하기</Button>
              </Form>
            </Modal.Body>
          </Modal>
          <div style={{ marginTop: '-25px', marginLeft: '20px', flex: '2' }}>
            <h3>여행 장소</h3>
            <Input
              style={{ width: '400px' }}
              placeholder='여행장소를 입력하세요'
              onChange={handleSearchInput}
            />
            <Button onClick={handleUpdateSearchInput}>입력</Button>
          </div>
        </Card.Body>
      </Card>
      <div className='CommentList'>
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={3}
            value={review}
            onChange={handleReviewChange}
            onKeyDown={keyDown}
          />
        </Form.Group>
        <Button variant='primary' onClick={handleAddComment}>
          댓글 추가
        </Button>
        {comments.length === 0
          ? ''
          : comments.map((comment, index) => (
              <div>
                <Card key={index}>
                  <p>날짜: {comment.postDate}</p>
                  <p>글쓴이: {comment.senderName}</p>
                  <p>댓글: {comment.review}</p>
                </Card>
                {comment.senderName === userName ? (
                  <Button onClick={() => handleDeleteCertainComment(index)}>
                    삭제
                  </Button>
                ) : (
                  ''
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default DetailPage;
