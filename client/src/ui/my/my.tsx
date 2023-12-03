import { useState } from 'react';
import { Button } from 'antd';

import WithdrawPage from '@/ui/my/withdraw/withdraw';


function MyPage() {
  const [currentSection, setCurrentSection] = useState('section1');

  const handleChangeCurrentSection = (section: string) => {
    setCurrentSection(section);
  };

  const testEmail = '1'

  return (
    <div>
      <Button onClick={() => handleChangeCurrentSection('section1')}>프로필</Button>
      <Button onClick={() => handleChangeCurrentSection('section2')}>정보수정</Button>
      <Button onClick={() => handleChangeCurrentSection('section3')}>일정조회</Button>
      <Button onClick={() => handleChangeCurrentSection('section4')}>회원탈퇴</Button>

      <div id="section1">
        {currentSection === 'section1' && (
          <div>
            <h2>Section 1 Content</h2>
            <p>This is the content of Section 1.</p>
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
           <WithdrawPage email={testEmail} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
