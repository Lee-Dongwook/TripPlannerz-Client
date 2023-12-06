import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Spin, Menu } from 'antd';

import { Member } from '@/domain/Member';
import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import ProfilePage from '@/ui/my/profile/profile';
import AccountPage from '@/ui/my/account/account';
import WithdrawPage from '@/ui/my/withdraw/withdraw';

const { Item } = Menu;

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
    <div style={{ display: 'flex' }}>
      {loading ? (
        <Spin tip='loading...' size='large'></Spin>
      ) : (
        <>
          <Menu
            onClick={(e) => handleChangeCurrentSection(e.key)}
            selectedKeys={[currentSection]}
            mode='vertical'
            style={{
              width: '15%',
              height: 'calc(90vh)',
              backgroundColor: 'whitesmoke',
            }}
          >
            <Item key='section1'>프로필</Item>
            <Item key='section2'>정보수정</Item>
            <Item key='section3'>일정조회</Item>
            <Item key='section4'>회원탈퇴</Item>
          </Menu>
          <div style={{ flex: 1 }}>
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
                  <h2>Section 3 Content</h2>
                  <p>This is the content of Section 3.</p>
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
        </>
      )}
    </div>
  );
}

export default MyPage;
