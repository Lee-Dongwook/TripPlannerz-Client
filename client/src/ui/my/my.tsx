import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import { Member } from '@/domain/Member';
import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import ProfilePage from '@/ui/my/profile/profile';
import WithdrawPage from '@/ui/my/withdraw/withdraw';

function MyPage() {

  const token = useSelector((state: any) => state.token.token);

  const [currentSection, setCurrentSection] = useState('section1');
  const [memberInfo, setMemberInfo] = useState<Member>();

  const handleChangeCurrentSection = (section: string) => {
    setCurrentSection(section);
  };

  const handleGetMemberInfo = async() => {
    const response = await getMemberTripInfo(token);

    if(response.data){
      setMemberInfo(response.data);
    } else {
      throw new Error('서버로 부터 유저 정보를 가져오지 못함');
    }
  }

  useEffect(() => {
    handleGetMemberInfo();
  },[])

  return (
    <div>
      <Button onClick={() => handleChangeCurrentSection('section1')}>프로필</Button>
      <Button onClick={() => handleChangeCurrentSection('section2')}>정보수정</Button>
      <Button onClick={() => handleChangeCurrentSection('section3')}>일정조회</Button>
      <Button onClick={() => handleChangeCurrentSection('section4')}>회원탈퇴</Button>

      <div id="section1">
        {currentSection === 'section1' && (
          <div>
           <ProfilePage memberInfo={memberInfo} />
          </div>
        )}
      </div>

      <div id="section2">
        {currentSection === 'section2' && (
          <div>
            <h2>Section 2 Content</h2>
            <p>This is the content of Section 2.</p>
          </div>
        )}
      </div>

      <div id="section3">
        {currentSection === 'section3' && (
          <div>
            <h2>Section 3 Content</h2>
            <p>This is the content of Section 3.</p>
          </div>
        )}
      </div>

      <div id="section4">
        {currentSection === 'section4' && (
          <div>
           <WithdrawPage email={memberInfo?.email} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
