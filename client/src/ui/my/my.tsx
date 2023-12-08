import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Member } from '@/domain/Member';
import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import SideBar from '@/ui/sidebar/sidebar';
import ProfilePage from '@/ui/my/profile/profile';
import SchedulePage from '@/ui/my/schedule/schedule';
import WithdrawPage from '@/ui/my/withdraw/withdraw';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function MyPage() {
  const token = useSelector((state: any) => state.token.token);

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

  return (
    <div style={{ width: '100%', height: 'calc(100vh)', display: 'flex' }}>
      {loading ? (
        <Spin tip='Loading...' size='large' indicator={antIcon} />
      ) : (
        <>
          <Row style={{ width: '100%', height: '100%' }}>
            <SideBar />
            <Col span={20} style={{ padding: '16px' }}>
              <div style={{ height: '100%', overflow: 'auto' }}>
                <div id='section1'>
                  {currentSection === 'section1' && (
                    <div>
                      <ProfilePage memberInfo={memberInfo} />
                    </div>
                  )}
                </div>
                <div id='section3'>
                  {currentSection === 'section3' && (
                    <div>
                      <SchedulePage />
                    </div>
                  )}
                </div>
                <div id='section4'>
                  {currentSection === 'section4' && (
                    <div>
                      <WithdrawPage email={memberInfo?.email} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default MyPage;
