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
  Row,
  Col,
  Progress,
  Steps,
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
  const totalSteps = 8;

  const [tripInfo, setTripInfo] = useState<Trip>({});
  const [image, setImage] = useState([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      title: '여행 장소 선택',
    },
    {
      id: 2,
      title: '여행 사진 업로드',
    },
    {
      id: 3,
      title: '여행 제목',
    },
    {
      id: 4,
      title: '모집 인원 수',
    },
    {
      id: 5,
      title: '모집 마감 날짜',
    },
    {
      id: 6,
      title: '여행 시작 날짜',
    },
    {
      id: 7,
      title: '여행 종료 날짜',
    },
    {
      id: 8,
      title: '여행 등록',
    },
  ];

  const items = steps.map((item) => ({ key: item.id, title: item.title }));

  const handleStepChangeToPrev = () => {
    if (currentStep === 0) {
      alert('처음 부분입니다.');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChangeToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCascaderChange = (selectedOptions: string[]) => {
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'area', selectedOptions[1])
    );
    setTripInfo((prevInfo) =>
      updateTripInfo(prevInfo, 'sigungu', selectedOptions[2])
    );
  };

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

  const renderStepContent = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <div
            style={{
              width: '40%',
              height: '80%',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <h3>1. 여행 장소 선택</h3>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
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
            </Form.Item>
          </div>
        );

      case 1:
        return (
          <div
            style={{
              width: '40%',
              height: '80%',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <h3>2. 여행 사진 업로드</h3>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
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
            </Form.Item>
          </div>
        );

      case 2:
      case 3:
        return (
          <div
            style={{
              width: '40%',
              height: '80%',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <h3>{currentStep === 2 ? '3. 여행 제목' : '4. 모집 인원 수 '}</h3>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              {currentStep === 2 ? (
                <Input
                  style={{ width: '200px' }}
                  onChange={handleTripTitleChange}
                />
              ) : (
                <InputNumber
                  addonBefore={<UserOutlined />}
                  addonAfter='명'
                  min={1}
                  max={10}
                  onChange={handleTripRecuritNumChange}
                />
              )}
            </Form.Item>
          </div>
        );

      case 4:
      case 5:
      case 6:
        return (
          <div
            style={{
              width: '40%',
              height: '80%',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <h3>
              {currentStep === 4
                ? '5. 모집 마감날짜'
                : currentStep === 5
                  ? '6. 여행 시작 날짜'
                  : '7. 여행 종료 날짜'}
            </h3>

            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <DatePicker
                onChange={(_date, dateString) =>
                  currentStep === 4
                    ? handleTripCloseRecruitDateChange(dateString)
                    : currentStep === 5
                      ? handleTripGoingDateChange(dateString)
                      : handleTripComingDateChange(dateString)
                }
                placeholder={
                  currentStep === 4
                    ? '모집 마감 날짜'
                    : currentStep === 5
                      ? '가는 날 선택'
                      : '오는 날 선택'
                }
              />
            </Form.Item>
          </div>
        );

      case 7:
        return (
          <div
            style={{
              width: '40%',
              height: '80%',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <h2>{tripInfo.title}</h2>
            <p>{tripInfo.content}</p>
            <p>Capacity: {tripInfo.capacity}</p>
            <p>
              Starting Date:{' '}
              {new Date(tripInfo.startingDate!).toLocaleDateString()}
            </p>
            <p>Area: {tripInfo.area}</p>
            <p>Sigungu: {tripInfo.sigungu}</p>
          </div>
        );

      default:
        return null;
    }
  };

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
          <Row justify='center' align='middle' style={{ height: '10%' }}>
            <Steps current={currentStep} items={items} />
          </Row>
          <Form
            style={{
              maxWidth: '100%',
              height: '60%',
              backgroundColor: '#EEEEEE',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {renderStepContent(currentStep)}
          </Form>
          <Form.Item>
            <Row justify='center'>
              {currentStep < 7 ? (
                currentStep > 0 ? (
                  <>
                    <Button onClick={handleStepChangeToPrev}>이전</Button>
                    <Button onClick={handleStepChangeToNext}>다음</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleStepChangeToNext}>다음</Button>
                  </>
                )
              ) : (
                <>
                  <Button onClick={handleStepChangeToPrev}>이전</Button>
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={handleSubmitTripInfoToServer}
                  >
                    등록
                  </Button>
                </>
              )}
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePage;
