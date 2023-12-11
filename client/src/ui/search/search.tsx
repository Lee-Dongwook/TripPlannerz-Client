import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Col,
  Card,
  Drawer,
  Input,
  Modal,
  Radio,
  Row,
  Segmented,
  Space,
  Spin,
  Table,
  Timeline,
} from 'antd';

import type { Trip } from '@/domain/TripList';
import type { Comment } from '@/domain/Comment';

import { getPaginatedTripList } from '@/application/api/search/getPaginatedTripList';
import { getDetailTripRoute } from '@/application/api/detail/getDetailTripRoute';
import { postStartLocationToServer } from '@/application/api/detail/postStartLocationToServer';
import { postCommentToServer } from '@/application/api/detail/postCommentToServer';
import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';

import SideBar from '@/ui/sidebar/sidebar';

const { Meta } = Card;
const { TextArea } = Input;

function SearchPage() {
  const location = useLocation();
  const token = useSelector((state: any) => state.token.token);
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get('keyword');

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [sortType, setSortType] = useState<string>('new');

  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [selectedTripUuid, setSelectedTripUuid] = useState<string>('');
  const [selectedTripRoute, setSelectedTripRoute] = useState<any[]>();

  const [startLocation, setStartLocation] = useState<string>();

  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [optimizeModalState, setOptimizeModalState] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [calculateRouteLoading, setCalculateRouteLoading] =
    useState<boolean>(false);

  const [optimizeTime, setOptimizeTime] = useState<number>(0);

  const [review, setReview] = useState<string>('');
  const [requestContent, setRequestContent] = useState<string>('');

  const [tripCommentList, setTripCommentList] = useState<Comment[]>([]);

  const handleOpenDrawer = async (record) => {
    const selectedDetailTrip = tripList.find((trip) => trip.id === record.id);
    if (selectedDetailTrip) {
      if (selectedDetailTrip.uuid) {
        setSelectedTripUuid(selectedDetailTrip.uuid);
        const response = await getDetailTripRoute(
          token,
          selectedDetailTrip?.uuid
        );
        setSelectedTripRoute(response.data);
        setSelectedTrip(record);
        setDrawerState(true);
      }
    }
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
  };

  const handleOpenOptimizeModal = () => {
    setOptimizeModalState(true);
  };

  const handleCloseOptimizeModal = () => {
    setOptimizeModalState(false);
  };

  const handleSaveStartLocation = (e) => {
    setStartLocation(e.target.value);
  };

  const handleSendStartLocationToServer = async () => {
    const postToServer = {
      name: startLocation,
      tripUUID: selectedTripUuid,
    };

    setCalculateRouteLoading(true);
    const response = await postStartLocationToServer(token, postToServer);
    if (response) {
      alert('최단 경로 계산이 완료되었습니다.');
      setOptimizeTime(parseInt(response.data.totalDuration));
      setCalculateRouteLoading(false);
      setOptimizeModalState(false);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = async () => {
    const postToServer = {
      review: review,
      tripUUID: selectedTripUuid,
    };

    const response = await postCommentToServer(token, postToServer);

    if (response) {
      alert('댓글이 등록되었습니다.');
    }
  };

  const handleChangeRequestContent = (e) => {
    setRequestContent(e.target.value);
  };

  const handleRequestAccompany = async () => {
    const postToServer = {
      review: requestContent,
      tripUUID: selectedTripUuid,
    };

    const response = await postRequestAccompanyToServer(token, postToServer);
    if (response) {
      alert('동행 신청이 완료되었습니다.');
      setRequestContent('');
    }
  };

  const handleGetPaginatedTripList = async () => {
    if (searchedKeyword) {
      const encodedKey = encodeURIComponent(searchedKeyword);
      const response = getPaginatedTripList(token, 0, sortType, encodedKey);
      return response;
    } else {
      const response = getPaginatedTripList(token, 0, sortType, '');
      return response;
    }
  };

  const fetchData = async () => {
    const response = await handleGetPaginatedTripList();
    setTripList(response.data.content);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchedKeyword, sortType]);

  const tableColumns = [
    {
      title: '일정 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '마감날짜',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '인원 수',
      dataIndex: 'participants',
      key: 'participants',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '일정 날짜',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record)} className='list-key'>
          {text}
        </span>
      ),
    },
  ];

  const tableData = tripList.map((trip) => ({
    id: trip.id ? trip.id : '',
    title: trip.title ? trip.title : '',
    deadline:
      trip.startingDate && trip.comingDate
        ? trip.startingDate < trip.comingDate
          ? trip.startingDate
          : trip.comingDate
        : '',
    participants:
      trip.currentNum && trip.recruitNum
        ? trip.currentNum + ' / ' + trip.recruitNum
        : '',
    date:
      trip.startingDate && trip.comingDate
        ? trip.startingDate < trip.comingDate
          ? trip.startingDate + ' ~ ' + trip.comingDate
          : trip.comingDate + ' ~ ' + trip.startingDate
        : '',
  }));

  return (
    <div style={{ width: '100%', height: 'calc(100vh)', display: 'flex' }}>
      {loading ? (
        <Spin tip='loading...' size='large'>
          <Table />
        </Spin>
      ) : (
        <>
          <Row style={{ width: '100%', height: '100%' }}>
            <SideBar />
            <Col span={20} style={{ padding: '16px' }}>
              <Input type='text' placeholder='검색어를 입력하세요' />
              <Table
                title={() => (
                  <Segmented
                    options={[
                      { label: '최신 순', value: 'new' },
                      { label: '조회수 순', value: 'hits' },
                    ]}
                    value={sortType}
                    onChange={setSortType}
                  />
                )}
                columns={tableColumns}
                dataSource={tableData}
              />{' '}
              <Drawer
                title='일정 상세 정보'
                placement='right'
                closable={true}
                onClose={handleCloseDrawer}
                open={drawerState}
                width={1500}
              >
                {selectedTrip && (
                  <>
                    <Card>
                      <Meta
                        title={selectedTrip.title}
                        description={
                          <>
                            <h5>
                              모집 마감 날짜:{' '}
                              {selectedTrip.deadline
                                ? selectedTrip.deadline
                                : ''}
                            </h5>
                            <h5>
                              여행 기간:{' '}
                              {selectedTrip.date
                                ? selectedTrip.date
                                : '일정 없음'}
                            </h5>
                            <h5>
                              내용:{' '}
                              {selectedTrip.content
                                ? selectedTrip.content
                                : '예시 여행입니다.'}
                            </h5>
                            <h5>
                              현 인원 / 총 인원 :{' '}
                              {selectedTrip.participants
                                ? selectedTrip.participants
                                : ''}
                            </h5>
                          </>
                        }
                      />
                    </Card>
                    <Card style={{ maxHeight: '500px', overflowY: 'auto' }}>
                      <Meta
                        title='TimeLine'
                        description={
                          selectedTripRoute!.length === 0 ? (
                            '타임라인이 없습니다.'
                          ) : (
                            <>
                              <Timeline>
                                {selectedTripRoute?.map((route, index) => (
                                  <Timeline.Item key={index}>
                                    {route.name}
                                  </Timeline.Item>
                                ))}
                              </Timeline>
                              <Button onClick={handleOpenOptimizeModal}>
                                최단경로
                              </Button>
                              <Modal
                                title='시작점 선택'
                                open={optimizeModalState}
                                onCancel={handleCloseOptimizeModal}
                                footer={[
                                  <Button
                                    key='cancel'
                                    onClick={handleCloseOptimizeModal}
                                  >
                                    취소
                                  </Button>,
                                  <Button
                                    key='confirm'
                                    type='primary'
                                    onClick={handleSendStartLocationToServer}
                                  >
                                    확인
                                  </Button>,
                                ]}
                              >
                                {optimizeModalState && (
                                  <Radio.Group
                                    onChange={handleSaveStartLocation}
                                    value={startLocation}
                                  >
                                    {selectedTripRoute!.map((route, index) => (
                                      <Space direction='vertical' key={index}>
                                        <Radio value={route.name}>
                                          {route.name}
                                        </Radio>
                                      </Space>
                                    ))}
                                  </Radio.Group>
                                )}

                                {calculateRouteLoading && (
                                  <>
                                    <br />
                                    <Spin
                                      tip='이동시간을 계산중입니다...'
                                      size='large'
                                    >
                                      <></>
                                    </Spin>
                                  </>
                                )}
                              </Modal>
                              {optimizeTime > 0
                                ? optimizeTime.toString() +
                                  '분 (' +
                                  parseInt(optimizeTime / 60) +
                                  ' 시간 ' +
                                  (optimizeTime -
                                    parseInt(optimizeTime / 60) * 60) +
                                  ' 분)'
                                : '최단 경로 버튼을 누르면 최단 경로를 계산할 수 있습니다.'}
                            </>
                          )
                        }
                      />
                    </Card>
                    <Card>
                      <Meta
                        title='동행 신청'
                        description={
                          <>
                            <TextArea
                              rows={3}
                              placeholder='신청서를 작성해주세요'
                              onChange={handleChangeRequestContent}
                            />
                            <Button onClick={handleRequestAccompany}>
                              신청하기
                            </Button>
                          </>
                        }
                      />
                    </Card>
                    <Card>
                      <Meta
                        title='댓글 목록'
                        description={
                          <>
                            {' '}
                            <TextArea
                              rows={3}
                              value={review}
                              onChange={handleReviewChange}
                            />
                            <Button onClick={handleAddComment}>
                              댓글 추가
                            </Button>
                            {tripCommentList.length > 0 ? (
                              tripCommentList.map((comment, index) => (
                                <div>
                                  <Card key={index}>
                                    <p>날짜: {comment.postDate}</p>
                                    <p>글쓴이: {comment.senderName}</p>
                                    <p>댓글: {comment.review}</p>
                                  </Card>
                                </div>
                              ))
                            ) : (
                              <Card>
                                <p>날짜: </p>
                                <p>글쓴이: 관리자</p>
                                <p>댓글: 예시 댓글입니다.</p>
                              </Card>
                            )}
                          </>
                        }
                      />
                    </Card>
                  </>
                )}
              </Drawer>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default SearchPage;
