import { Button, Input } from 'antd';

export const SearchMap = () => {
  return (
    <>
      <h3>여행 장소</h3>
      <Input
        style={{ width: '400px' }}
        placeholder='여행장소를 입력하세요'
        onChange={handleSearchInput}
      />
      <Button onClick={handleUpdateSearchInput}>입력</Button>
      <Kakao width='400px' height='400px' searchKeyword={searchPlaceInput} />
    </>
  );
};
