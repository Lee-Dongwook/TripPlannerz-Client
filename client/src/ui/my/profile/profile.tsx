import { Table } from 'antd';

function ProfilePage({ memberInfo }) {
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

  const data = [
    {
      key: '1',
      name: memberInfo.name,
      gender: memberInfo.gender,
      email: memberInfo.email,
      ranklist: memberInfo.types,
    },
  ];

  return (
    <div>
      <h3>내 정보</h3>
      <hr />
      <Table columns={columns} dataSource={data} bordered pagination={false} />
      <hr />
    </div>
  );
}

export default ProfilePage;
