import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Menu } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Member } from '@/domain/Member';
import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import ProfilePage from '@/ui/my/profile/profile';
import AccountPage from '@/ui/my/account/account';
import SchedulePage from '@/ui/my/schedule/schedule';
import WithdrawPage from '@/ui/my/withdraw/withdraw';

const { Item } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function MyPage() {
  const token = useSelector((state: any) => state.token.token);

  const [currentSection, setCurrentSection] = useState('section1');
  const [memberInfo, setMemberInfo] = useState<Member>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangeCurrentSection = (section: string) => {
    setCurrentSection(section);
  };

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
            <Col
              span={4}
              style={{ backgroundColor: 'whitesmoke', padding: '16px' }}
            >
              <Menu
                onClick={(e) => handleChangeCurrentSection(e.key)}
                selectedKeys={[currentSection]}
                mode='vertical'
              >
                <Item key='section1'>프로필</Item>
                <Item key='section2'>정보수정</Item>
                <Item key='section3'>일정조회</Item>
                <Item key='section4'>회원탈퇴</Item>
              </Menu>
            </Col>
            <Col span={20} style={{ padding: '16px' }}>
              <div style={{ height: '100%', overflow: 'auto' }}>
                <div id='section1'>
                  {currentSection === 'section1' && (
                    <div>
                      <ProfilePage memberInfo={memberInfo} />
                    </div>
                  )}
                </div>
                <div id='section2'>
                  {currentSection === 'section2' && (
                    <div>
                      <AccountPage />
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
