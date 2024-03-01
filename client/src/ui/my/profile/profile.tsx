import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Card, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import type { Member } from '@/domain/Member';
import type { AccompanyList } from '@/domain/AccompanyList';

import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import { postAssignAccompany } from '@/application/api/my/postAssignAccompany';
import { postDenyAccompany } from '@/application/api/my/postDenyAccompany';

import SideBar from '@/ui/sidebar/sidebar';

function ProfilePage() {
  const token = useSelector((state: any) => state.token.token);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [memberInfo, setMemberInfo] = useState<Member>();
  const [accompanyList, setAccompanyList] = useState<AccompanyList[]>([
    {
      senderName: '테스트 사용자1',
      tripName: '부산',
      comment: '안녕하세요 OOO입니다. 해당 여행에 동행을 하고 싶어서 연락드렸습니다.',
      comment_id: '1',
      tripUUID: '1',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetMemberInfo = async () => {
    const response = await getMemberTripInfo(token);

    if (response.data) {
      setMemberInfo(response.data);
      setLoading(false);
    } else {
      throw new Error('서버로 부터 유저 정보를 가져오지 못함');
    }
  };

  const handleResponseAccompanyTrue = async (id) => {
    const check = true;

    const postToServer = {
      comment_id: accompanyList.filter((item) => item.comment_id === id)[0].comment_id,
    };

    const response = await postAssignAccompany(token, postToServer, check);

    if (response) {
      alert('동행 신청을 허락하였습니다.');
    }
  };

  const handleResponseAccompanyFalse = async (id) => {
    const check = false;

    const postToServer = {
      comment_id: accompanyList.filter((item) => item.comment_id === id)[0].comment_id,
    };

    const response = await postDenyAccompany(token, postToServer, check);

    if (response) {
      alert('동행 신청을 거부하였습니다.');
    }
  };

  useEffect(() => {
    handleGetMemberInfo();
  }, []);

  const data = [
    {
      key: '1',
      name: memberInfo?.name,
      gender: memberInfo?.gender,
      email: memberInfo?.email,
      ranklist: memberInfo?.types,
    },
  ];

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '선호태그',
      dataIndex: 'ranklist',
      key: 'ranklist',
    },
  ];

  return (
    <div style={{ width: '100%', height: 'calc(100vh)', display: 'flex' }}>
      {loading ? (
        <Spin tip='Loading...' size='large' indicator={antIcon} />
      ) : (
        <>
          <Row style={{ width: '100%', height: '100%' }}>
            <SideBar />
            <Col span={15} style={{ padding: '16px' }}>
              <h3>내 정보</h3>
              <hr />
              <Table columns={columns} dataSource={data} bordered pagination={false} />
              <hr />
              <h3>동행 신청 현황</h3>
              {accompanyList.length > 0 &&
                accompanyList.map((item, idx) => (
                  <Card key={idx}>
                    <h6>신청자 : {item.senderName}</h6>
                    <h6>여행: {item.tripName}</h6>
                    <h6>
                      신청 내용 :{' '}
                      {item.comment.length <= 50 ? item.comment : item.comment.slice(0, 50) + '...'}
                    </h6>
                    <table>
                      <td>
                        <Button onClick={handleResponseAccompanyTrue(item.comment_id)}>O</Button>
                      </td>
                      <td>
                        <Button onClick={handleResponseAccompanyFalse(item.comment_id)}>X</Button>
                      </td>
                    </table>
                  </Card>
                ))}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
