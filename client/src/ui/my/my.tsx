import { useState, useEffect } from "react";
import { Button } from "antd";

import { myCurrentRender } from '@/ui/my/myCurrentRender'; 

function MyPage() {
  const [currentPageState, setCurrentPageState] = useState<string>("profile");
  const [currentPageComponent, setCurrentPageComponent] = useState<JSX.Element>();

  const handleCurrentPageChange = () => {
    const render = myCurrentRender({currentPageState});
    if(render) {
      setCurrentPageComponent(render);
    }

    throw new Error('Page Component is not compositied');
  }

  useEffect(() => {
    handleCurrentPageChange();
  },[currentPageState])

  return (
    <div>
      <div>
        <table>
          <td>
            <div>{currentPageComponent}</div>
          </td>
          <td>
            <div>
              <div>
                <Button className={`buttonstyle ${currentPageState === "profile" ? "active" : ""}`} onClick={() => setCurrentPageState("profile")}>프로필</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "account" ? "active" : ""}`} onClick={() => setCurrentPageState("account")}>정보 수정</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "schedule" ? "active" : ""}`} onClick={() => setCurrentPageState("schedule")}>일정 조회</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "schedule" ? "active" : ""}`} onClick={() => setCurrentPageState("withdraw")}>회원 탈퇴</Button>
              </div>
            </div>
          </td>
        </table>
      </div>
      <br />
    </div>
  );
}

export default MyPage;