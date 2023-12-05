import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Spin } from 'antd';

import { Trip } from '@/domain/TripList';
import { getPaginatedTripList } from '@/application/api/search/getPaginatedTripList';
import { Pagination } from '@/ui/search/pagination/pagination';

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
          onClick={() => handleMoveToCertainTrip(record.key)}
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
          onClick={() => handleMoveToCertainTrip(record.key)}
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
          onClick={() => handleMoveToCertainTrip(record.key)}
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
          onClick={() => handleMoveToCertainTrip(record.key)}
          className='list-key'
        >
          {text}
        </span>
      ),
    },
  ];

  const tableData = tripList.map((trip) => ({
    title: trip.title ? trip.title : '',
    deadline:
      trip.goingDate && trip.comingDate
        ? trip.goingDate < trip.comingDate
          ? trip.goingDate
          : trip.comingDate
        : '',
    participants:
      trip.currentNum && trip.recruitNum
        ? trip.currentNum + ' / ' + trip.recruitNum
        : '',
    date:
      trip.goingDate && trip.comingDate
        ? trip.goingDate < trip.comingDate
          ? trip.goingDate + ' ~ ' + trip.comingDate
          : trip.comingDate + ' ~ ' + trip.goingDate
        : '',
  }));

  return (
    <div>
      {loading ? (
        <Spin tip='loading...' size='large'>
          <Table />
        </Spin>
      ) : (
        <>
          <Table
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
          />
          <Pagination totalPage={5} />
        </>
      )}
    </div>
  );
}

export default SearchPage;
