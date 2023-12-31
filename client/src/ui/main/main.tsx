import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Row,
  Button,
  Col,
  Card,
  List,
  Progress,
  Spin,
  FloatButton,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Trip } from '@/domain/TripList';
import { getEntireTripList } from '@/application/api/main/getEntireTripList';
import Kakao from '@/lib/kakao/kakao';

import SideBar from '@/ui/sidebar/sidebar';
import styles from '@/ui/main/main.module.css';

function MainPage() {
  const token = useSelector((state: any) => state.token.token);

  const navigate = useNavigate();

  const [travelList, setTravelList] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const response = await getEntireTripList(token);
    const updateList = response.data.content;
    setTravelList(updateList);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <Spin tip='Loading...' size='large'>
          <List grid={{ gutter: 50, column: 5 }} />
        </Spin>
      ) : (
        <>
          <Row style={{ width: '100%', height: '100%' }}>
            <SideBar />
            <Col span={20} style={{ padding: '16px' }}>
              <Card>
                <h1>여행 일정</h1>
                <h3>동행하고 싶은 여행을 찾아보세요</h3>
              </Card>
              <List
                grid={{ gutter: 50, column: 3 }}
                dataSource={travelList}
                renderItem={(item) => (
                  <List.Item>
                    <Card className={styles.mainCard}>
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
                              ? Math.floor(
                                  (item.currentNum / item.recruitNum) * 100
                                )
                              : 0
                          }
                          status='active'
                        />
                      </div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        <strong>여행 기간:</strong> {item.startingDate} ~{' '}
                        {item.comingDate}
                      </div>
                      <br />
                      <Button
                        onClick={() => movetoSubPage(item.id ? item.id : 0)}
                      >
                        이동하기
                      </Button>
                    </Card>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </>
      )}
      <FloatButton
        tooltip={<div>Questions</div>}
        style={{ width: '60px', height: '60px' }}
        icon={<QuestionCircleOutlined />}
      />
    </div>
  );
}

export default MainPage;
