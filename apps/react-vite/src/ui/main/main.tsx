import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { Row, Col, Card, List, Progress, Button, Spin } from 'antd';

import { getEntireTripList } from '@/application/api/main/getEntireTripList';
import Weather from '@/lib/weather/weather';
import SightImage from '@/lib/image/관광지.png';
import SideBar from '@/ui/sidebar/sidebar';

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
    <div>
      <Row>
        <SideBar />
        <Col>
          {isError && <div>오류가 발생하였습니다.</div>}
          <Card>
            <img src={SightImage} width={200} />
          </Card>
          <List
            dataSource={travelList}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  <h3>{item.title}</h3>
                  <hr />
                  <div>
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
                  <div>
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
    </div>
  );
}

export default MainPage;
