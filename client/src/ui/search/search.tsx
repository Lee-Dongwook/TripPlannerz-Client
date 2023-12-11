import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Drawer, Descriptions, Table, Spin, Input } from 'antd';

import { Trip } from '@/domain/TripList';
import { getPaginatedTripList } from '@/application/api/search/getPaginatedTripList';
import SideBar from '@/ui/sidebar/sidebar';
import DetailDrawerPage from '@/ui/detail/detailDrawer';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: any) => state.token.token);
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get('keyword');

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOpenDrawer = (postId: string) => {
    // setSelectedTrip();
    setDrawerState(true);
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
  };

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
        <span onClick={() => handleOpenDrawer(record.id)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '마감날짜',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record.id)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '인원 수',
      dataIndex: 'participants',
      key: 'participants',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record.id)} className='list-key'>
          {text}
        </span>
      ),
    },
    {
      title: '일정 날짜',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <span onClick={() => handleOpenDrawer(record.id)} className='list-key'>
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
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
              />{' '}
              <Drawer
                title='일정 상세 정보'
                placement='right'
                closable={true}
                onClose={handleCloseDrawer}
                open={drawerState}
                width={1500}
              >
                <DetailDrawerPage />
              </Drawer>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default SearchPage;
