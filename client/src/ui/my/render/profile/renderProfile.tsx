import { Button, Card, Table } from 'antd';
import type { RenderProfileProp } from '@/ui/my/render/profile/renderProfileProp.types';

export const renderProfilePage = ({accompanyList, columns, data, onClick}: RenderProfileProp) => {
    return (
      <div>
        <h3>내 정보</h3>
        <hr />
        <Table columns={columns} dataSource={data} bordered pagination={false} />
        <hr />
        <h4>동행 신청 현황</h4>
          {accompanyList.length > 0 && accompanyList.map((item,idx) => 
            <Card key={idx}>
              <h6>신청자 : {item.senderName}</h6> 
              <h6>여행: {item.tripName}</h6>
              {/* <h6>신청 내용 : {item.comment.length <= 50 ? item.comment : item.comment.slice(0,50) + '...'}</h6> */}
              <table>
                <td>
                <Button onClick={onClick.responseAccompanyTrue(item.comment_id)}>O</Button>
                </td>
                <td>
                <Button onClick={onClick.responseAccompanyFalse(item.comment_id)}>X</Button>
                </td>
              </table>
              
            </Card>
          )}
        </div>
    );
  };