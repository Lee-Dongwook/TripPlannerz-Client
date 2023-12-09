import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Member } from '@/domain/Member';
import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import SideBar from '@/ui/sidebar/sidebar';

function ProfilePage() {
  const token = useSelector((state: any) => state.token.token);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [memberInfo, setMemberInfo] = useState<Member>();
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
            <Col span={20} style={{ padding: '16px' }}>
              <h3>내 정보</h3>
              <hr />
              <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
              />
              <hr />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
