import { Button, Modal, Space, Radio } from 'antd';

export const OptimizeRoute = () => {
  return (
    <>
      <Button
        style={{
          width: '200px',
          backgroundColor: 'white',
          color: 'black',
        }}
        onClick={handleChangeTimeLineItem}
      >
        경로 최적화
      </Button>
      <Modal show={optimizeModal} onHide={handleCloseOptimizeModal}>
        <Modal.Header closeButton>
          <Modal.Title>시작점 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {optimizeModal && (
            <Radio.Group onChange={handleSaveStartLocation} value={startLocation}>
              {searchPlaceForOptimize.map((searchPlace, index) => (
                <Space direction='vertical' key={index}>
                  <Radio value={searchPlace.name}>{searchPlace.name}</Radio>
                </Space>
              ))}
            </Radio.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={sendStartLocationToServer}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
