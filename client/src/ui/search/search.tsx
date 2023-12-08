import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Menu, Table, Spin } from 'antd';

import { Trip } from '@/domain/TripList';
import { getPaginatedTripList } from '@/application/api/search/getPaginatedTripList';
import { Pagination } from '@/ui/search/pagination/pagination';

const { Item } = Menu;

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: any) => state.token.token);
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get('keyword');

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleMoveToCertainTrip = (postId: string) => {
    const url = `/search/${postId}`;
    navigate(url);
  };

  const handleGetPaginatedTripList = async () => {
    if (searchedKeyword) {
      const encodedKey = encodeURIComponent(searchedKeyword);
      const response = getPaginatedTripList(token, 0, 'new', encodedKey);
      return response;
    } else {
      const response = getPaginatedTripList(token, 0, 'new', '');
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
  }, [searchedKeyword]);

  const tableColumns = [
    {
      title: '일정 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <span
          onClick={() => handleMoveToCertainTrip(record.id)}
          className='list-key'
        >
          {text}
        </span>
      ),
    },
    {
      title: '마감날짜',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text, record) => (
        <span
          onClick={() => handleMoveToCertainTrip(record.id)}
          className='list-key'
        >
          {text}
        </span>
      ),
    },
    {
      title: '인원 수',
      dataIndex: 'participants',
      key: 'participants',
      render: (text, record) => (
        <span
          onClick={() => handleMoveToCertainTrip(record.id)}
          className='list-key'
        >
          {text}
        </span>
      ),
    },
    {
      title: '일정 날짜',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <span
          onClick={() => handleMoveToCertainTrip(record.id)}
          className='list-key'
        >
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
            <Col
              span={4}
              style={{ backgroundColor: 'whitesmoke', padding: '16px' }}
            >
              <Menu mode='vertical'>
                <Item key='new'>최신 순</Item>
                <Item key='hits'>조회수 순</Item>
                <Item key='favorite'>좋아요 순</Item>
              </Menu>
            </Col>
            <Col span={20} style={{ padding: '16px' }}>
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
              />
              <Pagination totalPage={5} />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default SearchPage;
