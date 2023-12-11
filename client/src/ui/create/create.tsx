import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Table,
  Row,
  Col,
} from 'antd';
import ImgCrop from 'antd-img-crop';

import { Trip } from '@/domain/TripList';
import { updateTripInfo } from '@/application/navbar/updateTripInfo';
import { SubmitTripInfoToServer } from '@/application/navbar/submitTripInfoToServer';
import { TripCategoryCascaderOption } from '@/lib/info/tripCategoryCascaderOption';
import {
  majorCategories,
  minorCategories,
  subCategories,
} from '@/lib/info/tripCatergoryList';

import SideBar from '@/ui/sidebar/sidebar';
import styles from '@/ui/create/create.module.css';
import { UserOutlined } from '@ant-design/icons';

function CreatePage() {
  const navigate = useNavigate();

  const token = useSelector((state: any) => state.token.token);

  const [tripInfo, setTripInfo] = useState<Trip>({});
  const [image, setImage] = useState([]);

  const onImageChange = (info) => {
    setImage(info.fileList);
  };

  const onImagePreview = (file) => {
    const imgWindow = window.open(file.url);
    imgWindow?.document.write(`<img src="${file.url}" alt="Preview" />`);
  };

  const handleTripTitleChange = (event) => {
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'title', event.target.value)
    );
  };
  const handleTripRecuritNumChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'recruitNum', event));
  };
  const handleTripCloseRecruitDateChange = (event) => {
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'closeRecruitDate', event)
    );
  };
  const handleTripGoingDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'startingDate', event));
  };
  const handleTripComingDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'comingDate', event));
  };

  const handleCascaderChange = (selectedOptions: string[]) => {
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'area', selectedOptions[1])
    );
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'sigungu', selectedOptions[2])
    );
  };

  const createTripTableFirstRow = [
    {
      title: '1) 사진 업로드',
      dataIndex: 'imageUpload',
      width: 200,
      render: () => (
        <>
          <ImgCrop rotationSlider>
            <Upload
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
              listType='picture-card'
              fileList={image}
              onChange={onImageChange}
              onPreview={onImagePreview}
            >
              {image.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </>
      ),
    },
    {
      title: '2) 여행 제목',
      dataIndex: 'title',
      width: 200,
      render: () => (
        <Form.Item
          name='title'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Input style={{ width: '200px' }} onChange={handleTripTitleChange} />
        </Form.Item>
      ),
    },
    {
      title: '3) 모집 인원',
      dataIndex: 'capacity',
      width: 200,
      render: () => (
        <Form.Item
          name='capacity'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <InputNumber
            addonBefore={<UserOutlined />}
            addonAfter='명'
            min={1}
            max={10}
            onChange={handleTripRecuritNumChange}
          />
        </Form.Item>
      ),
    },
  ];

  const createTripTableSecondRow = [
    {
      title: '4) 모집 마감 날짜',
      dataIndex: 'deadlineDate',
      width: 200,
      render: () => (
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <DatePicker
            onChange={(_date, dateString) =>
              handleTripCloseRecruitDateChange(dateString)
            }
            placeholder='모집 마감 날짜'
          />
        </Form.Item>
      ),
    },
    {
      title: '5) 여행 시작 날짜',
      dataIndex: 'startDate',
      width: 200,
      render: () => (
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <DatePicker
            onChange={(_date, dateString) =>
              handleTripGoingDateChange(dateString)
            }
            placeholder='가는 날 선택'
          />
        </Form.Item>
      ),
    },
    {
      title: '6) 여행 종료 날짜',
      dataIndex: 'endDate',
      width: 200,
      render: () => (
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <DatePicker
            onChange={(_date, dateString) =>
              handleTripComingDateChange(dateString)
            }
            placeholder='오는 날 선택'
          />
        </Form.Item>
      ),
    },
  ];

  const initialData = [{}];

  const handleSubmitTripInfoToServer = async () => {
    const response = await SubmitTripInfoToServer(token, image, tripInfo);

    if (response) {
      alert('여행이 생성되었습니다.');
      navigate('/main');
    } else {
      alert('여행 생성에 오류가 발생하였습니다.');
    }
  };

  return (
    <div className={styles.createContainer}>
      <Row style={{ width: '100%', height: '100%' }}>
        <SideBar />
        <Col span={20} style={{ padding: '16px' }}>
          <h5>1. 여행 장소 선택</h5>
          <Form>
            <Cascader
              onChange={handleCascaderChange}
              size='large'
              placeholder='지역을 선택하세요'
              options={TripCategoryCascaderOption(
                majorCategories,
                minorCategories,
                subCategories
              )}
            />
          </Form>
          <hr />
          <h5>2. 여행 정보 입력</h5>
          <br />
          <Form>
            <Table
              columns={createTripTableFirstRow}
              dataSource={initialData}
              bordered
              pagination={false}
              rowKey={(record, index) => String(index)}
            />
            <Table
              columns={createTripTableSecondRow}
              dataSource={initialData}
              bordered
              pagination={false}
              rowKey={(record, index) => String(index)}
            />
          </Form>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={handleSubmitTripInfoToServer}
            >
              등록
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePage;
