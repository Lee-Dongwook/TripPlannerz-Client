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
  Result,
  Row,
  Col,
  Steps,
  Card,
} from 'antd';
import ImgCrop from 'antd-img-crop';

import { Trip } from '@/domain/TripList';
import { updateTripInfo } from '@/application/navbar/updateTripInfo';
import { SubmitTripInfoToServer } from '@/application/navbar/submitTripInfoToServer';
import { TripCategoryCascaderOption } from '@/lib/info/tripCategoryCascaderOption';
import { majorCategories, minorCategories, subCategories } from '@/lib/info/tripCatergoryList';

import SideBar from '@/ui/sidebar/sidebar';
import styles from '@/ui/create/create.module.css';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function CreatePage() {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token.token);
  const totalSteps = 8;

  const [tripInfo, setTripInfo] = useState<Trip>({});
  const [image, setImage] = useState([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [createSuccessState, setCreateSucessState] = useState<boolean>(false);

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

  const handleCascaderChange = (selectedOptions: any) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'area', selectedOptions[1]));
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'sigungu', selectedOptions[2]));
  };

  const onImageChange = (info) => {
    setImage(info.fileList);
  };

  const onImagePreview = (file) => {
    const imgWindow = window.open(file.url);
    imgWindow?.document.write(`<img src="${file.url}" alt="Preview" />`);
  };

  const handleTripTitleChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'title', event.target.value));
  };
  const handleTripRecuritNumChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'recruitNum', event));
  };
  const handleTripCloseRecruitDateChange = (event) => {
    setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'closeRecruitDate', event));
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
          <Card style={{ width: '40%', height: '60%' }}>
            <Meta
              title='여행 장소 선택'
              description={
                <>
                  <p>방문하실 여행 장소를 선택합니다.</p>
                  <p>대분류(특별시/광역시/도)</p>
                  <p>중분류(특별시,광역시 : 시 이름/ 도: 도 이름)</p>
                  <p>소분류(특별시,광역시 : 구 이름 / 도: 시 이름)</p>
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
                </>
              }
            />
          </Card>
        );

      case 1:
        return (
          <Card style={{ width: '40%', height: '60%' }}>
            <Meta
              title='여행 사진 업로드'
              description={
                <>
                  <p>
                    해당 여행 일정을 대표하는 사진을 올려 다른 사용자들이 확인 할 수 있게 합니다.
                  </p>
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
                </>
              }
            />
          </Card>
        );

      case 2:
      case 3:
        return (
          <Card style={{ width: '40%', height: '60%' }}>
            <Meta
              title={currentStep === 2 ? '3. 여행 제목' : '4. 모집 인원 수'}
              description={
                <>
                  <p>
                    {currentStep === 2
                      ? '해당 여행 일정의 제목을 작성해주세요'
                      : '해당 여행 일정에 함께할 인원 수를 제한하여 주세요'}
                  </p>
                  <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                    {currentStep === 2 ? (
                      <Input style={{ width: '200px' }} onChange={handleTripTitleChange} />
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
                </>
              }
            />
          </Card>
        );

      case 4:
      case 5:
      case 6:
        return (
          <Card style={{ width: '40%', height: '60%' }}>
            <Meta
              title={
                currentStep === 4
                  ? '5. 모집 마감날짜'
                  : currentStep === 5
                    ? '6. 여행 시작 날짜'
                    : '7. 여행 종료 날짜'
              }
              description={
                <>
                  <p>
                    {currentStep === 4
                      ? '동행할 인원 모집의 마감 날짜를 정해주세요. '
                      : currentStep === 5
                        ? '해당 여행 일정의 시작 날짜를 정해주세요. '
                        : '해당 여행 일정의 종료 날짜를 정해주세요. '}
                  </p>
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
                </>
              }
            />
          </Card>
        );

      case 7:
        return (
          <Card style={{ width: '40%', height: '60%' }}>
            <Meta
              title='여행 등록'
              description={
                <>
                  <p>생성할 여행 일정의 정보들을 확인합니다.</p>
                  <hr />
                  <p>여행 제목: {tripInfo.title}</p>
                  <p>
                    여행 장소: {tripInfo.area} {tripInfo.sigungu}
                  </p>
                  <p>모집 인원 수 : {tripInfo.recruitNum} </p>
                  <p>모집 마감 날짜: {new Date(tripInfo.closeRecruitDate!).toLocaleDateString()}</p>
                  <p>
                    여행 날짜 : {new Date(tripInfo.startingDate!).toLocaleDateString()}~{' '}
                    {new Date(tripInfo.comingDate!).toLocaleDateString()}
                  </p>
                </>
              }
            />
          </Card>
        );

      default:
        return null;
    }
  };

  const handleSubmitTripInfoToServer = async () => {
    const response = await SubmitTripInfoToServer(token, image, tripInfo);

    if (response) {
      setCreateSucessState(true);
    } else {
      alert('여행 생성에 오류가 발생하였습니다.');
    }
  };

  return (
    <div className={styles.createContainer}>
      <Row style={{ width: '100%', height: '100%' }}>
        <SideBar />
        {createSuccessState ? (
          <Col span={20} style={{ padding: '16px' }}>
            <Result
              status='success'
              title={`${tripInfo.title} 여행 일정이 생성되었습니다!`}
              subTitle='동행자들을 모집하고, 즐거운 여행 되세요!'
              extra={<Button onClick={() => navigate('/main')}>Home</Button>}
            />
          </Col>
        ) : (
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
                    <Button type='primary' htmlType='submit' onClick={handleSubmitTripInfoToServer}>
                      등록
                    </Button>
                  </>
                )}
              </Row>
            </Form.Item>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default CreatePage;
