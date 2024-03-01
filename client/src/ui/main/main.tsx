import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { Row, Col, Card, List, Progress, FloatButton, Button, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { getEntireTripList } from '@/application/api/main/getEntireTripList';
import Weather from '@/lib/weather/weather';
import SightImage from '@/lib/image/관광지.png';
import SideBar from '@/ui/sidebar/sidebar';
import styles from '@/ui/main/main.module.css';

function MainPage() {
  const token = useSelector((state: any) => state.token.token);
  const navigate = useNavigate();

  const [intersectionTarget, setIntersectionTarget] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery(
    ['tripList', token],
    ({ pageParam = 0 }) => getEntireTripList(token, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPageParam = lastPage.data.content.length === 0 ? false : allPages.length;
        return nextPageParam;
      },
    }
  );

  const travelList = data?.pages.flatMap((page) => page.data.content) || [];

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  const observeTarget = useCallback((node) => {
    setIntersectionTarget(node);
  }, []);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage().catch((error) => {
          console.error(error);
        });
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (intersectionTarget) {
      observer.observe(intersectionTarget);
    }

    return () => {
      if (intersectionTarget) {
        observer.unobserve(intersectionTarget);
      }
    };
  }, [intersectionTarget, observerCallback]);

  return (
    <div className={styles.mainContainer}>
      <Row style={{ width: '100%', height: '100%' }}>
        <SideBar />
        <Col span={15} style={{ padding: '16px' }}>
          {isError && <div>오류가 발생하였습니다.</div>}
          <Card className={styles.imgCard}>
            <img src={SightImage} width={200} />
          </Card>
          <List
            dataSource={travelList}
            renderItem={(item) => (
              <List.Item>
                <Card className={styles.mainCard}>
                  <h3
                    style={{
                      color: '#1890ff',
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
                    <strong>인원 현황: </strong> {item.currentNum} / {item.recruitNum}
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
                    <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
                  </div>
                  <br />
                  <Button onClick={() => movetoSubPage(item.id ? item.id : 0)}>
                    일정 상세 확인하기
                  </Button>
                </Card>
              </List.Item>
            )}
          />
          {isFetching && <Spin tip='Loading...' size='large' />}
          <div ref={observeTarget} />
        </Col>
        <Weather />
      </Row>
      <FloatButton
        tooltip={<div>Questions</div>}
        style={{ width: '60px', height: '60px' }}
        icon={<QuestionCircleOutlined />}
      />
    </div>
  );
}

export default MainPage;
