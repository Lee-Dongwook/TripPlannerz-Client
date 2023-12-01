import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";

import type { Member } from "@/domain/Member";
import type { AccompanyList } from "@/domain/AccompanyList";

import { getMemberTripInfo } from "@/application/api/my/getMemberTripInfo";
import { getTripAccompanyRequestList } from "@/application/api/my/getTripAccompanyRequestList";
import { getPaginatedTripList } from "@/application/api/my/getPaginatedTripList";

import { convertPreverenceRankToTypeName } from "@/lib/info/convertPreferenceRankToTypeName";

import { myCurrentRender } from "@/ui/my/myCurrentRender";


function MyPage() {
  const token = useSelector((state:any) => state.token.token);

  const [memberInfo, setMemberInfo] = useState<Member>({});
  const [accompanyList, setAccompanyList] = useState<AccompanyList[]>([])
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPageState, setCurrentPageState] = useState("profile");
  const [currentPageComponent, setCurrentPageComponent] = useState<JSX.Element>();

  const handleGetMemberTripInfo = async() => {
    const response = await getMemberTripInfo(token);

    if(response.data){
      
      const updateMemberInfo: Record<Exclude<keyof Member,"pw">, any> = {
        name: response.data.name,
        gender: response.data.gender,
        email: response.data.email,
        types: response.data.prefereneces
      }
      
      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        updateMemberInfo
      }))
    }
  }

  const handleGetTripAccompanyRequestList = async() => {
    const response = await getTripAccompanyRequestList(token);

    if(response.data){
      const newAccompanyList = {
        comment: response.data[0].comment,
        comment_id: response.data[0].comment_id,
        senderName: response.data[0].senderName,
        tripName: response.data[0].tripName,
        tripUUID: response.data[0].tripUUID
      }

      setAccompanyList([...accompanyList, newAccompanyList]);
    }
  }

  const handleGetPaginatedTripList = async() => {
    const response = await getPaginatedTripList(token, currentNumber, order);

    if(response.data){
      setPosts(response.data.content);
    }
  }

  useEffect(() => {
    handleGetMemberTripInfo();
    handleGetTripAccompanyRequestList();
    // convertPreverenceRankToTypeName(memberInfo.types);
  }, []);

  useEffect(() => {
    handleGetPaginatedTripList();
  }, [currentNumber, order])

  useEffect(() => {
  const render = myCurrentRender(currentPageState)
  if(render){
    setCurrentPageComponent(render);  
  }  
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
                <Button className={`buttonstyle ${currentPageState === "profile" ? "active" : ""}`} onClick={() => handlePageChange("profile")}>프로필</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "account" ? "active" : ""}`} onClick={() => handlePageChange("account")}>정보 수정</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "schedule" ? "active" : ""}`} onClick={() => handlePageChange("schedule")}>일정 조회</Button>
                <hr />
                <Button className={`buttonstyle ${currentPageState === "schedule" ? "active" : ""}`} onClick={() => handlePageChange("withdraw")}>회원 탈퇴</Button>
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