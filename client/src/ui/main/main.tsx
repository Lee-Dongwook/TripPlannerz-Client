import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, List, Progress, FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Trip } from '@/domain/TripList';
import { getEntireTripList } from '@/application/api/main/getEntireTripList';

function MainPage() {
  const token = useSelector((state: any) => state.token.token);

  const navigate = useNavigate();

  const [travelList, setTravelList] = useState<Trip[]>([]);

  const fetchData = async () => {
    const response = await getEntireTripList(token);
    console.log(response.data.content);
    const updateList = response.data.content;
    setTravelList(updateList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={travelList}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={() => movetoSubPage(item.id ? item.id : 0)}
              style={{
                width: '300px',
                height: '340px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3
                style={{
                  color: '#1890ff',
                  marginBottom: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              >
                {item.title}
              </h3>
              <hr />
              <div
                style={{
                  color: '#666',
                  marginBottom: '10px',
                  fontSize: '1rem',
                }}
              >
                <strong>인원 현황: </strong> {item.currentNum} /{' '}
                {item.recruitNum}
                <br />
                <Progress
                  percent={
                    item.currentNum && item.recruitNum
                      ? Math.floor((item.currentNum / item.recruitNum) * 100)
                      : 0
                  }
                  status='active'
                />
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>여행 기간:</strong> {item.goingDate} ~ {item.comingDate}
              </div>
            </Card>
          </List.Item>
        )}
      />
      <FloatButton
        tooltip={<div>Questions</div>}
        style={{ width: '60px', height: '60px' }}
        icon={<QuestionCircleOutlined />}
      />
    </div>
  );
}

export default MainPage;
