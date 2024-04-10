import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';
import debounce from 'lodash/debounce';

import { Member } from '@/types/Member';

import { getEventSource } from '@/application/api/navbar/getEventSource';
import { getMemberTripInfo } from '@/application/api/navbar/getMemberTripInfo';

import { setNotification } from '@/store/notification';

import { NavbarButton } from '@/ui/navbar/button/navbarButton';
import { NavbarInput } from '@/ui/navbar/input/navbarInput';
import { NoticeDrawer } from '@/ui/navbar/drawer/noticeDrawer';
import { UserInfoDrawer } from '@/ui/navbar/drawer/userInfoDrawer';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token: string = useSelector((state: any) => state.token.token);
  const notifications: string[] = useSelector(
    (state: any) => state.notification.notifications || []
  );

  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);
  const [noticeDrawerState, setNoticeDrawerState] = useState<boolean>(false);
  const [userInfoDrawerState, setUserInfoDrawerState] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [memberInfo, setMemberInfo] = useState<Member>({});

  const moveToMain = () => {
    navigate('/main');
  };

  const moveToCreate = () => {
    navigate('/create');
  };

  const moveToSearch = () => {
    navigate('/search');
  };

  const moveToBill = () => {
    navigate('/bill');
  };

  const delayedSearch = useCallback(
    debounce((searchValue) => {
      navigate(`/search?keyword=${searchValue}`);
    }, 500),
    []
  );

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    delayedSearch(event.target.value);
  };

  const openNoticeDrawer = () => {
    setNoticeDrawerState(true);
  };

  const closeNoticeDrawer = () => {
    setNoticeDrawerState(false);
  };

  const openUserInfoDrawer = () => {
    setUserInfoDrawerState(true);
  };

  const closeUserInfoDrawer = () => {
    setUserInfoDrawerState(false);
  };

  const createEventSource = () => {
    const eventSource = getEventSource(token);

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const notificationString = `${message.senderName}님이 \n ${message.review.slice(
        0,
        4
      )}..를 입력하였습니다. \n ${message.postDate}`;
      dispatch(setNotification(notificationString));
    };

    eventSource.onclose = () => {};

    setEventSource(eventSource);
  };

  const deleteEventSource = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  };

  const handleGetMemberInfo = async () => {
    const response = await getMemberTripInfo(token);
    if (response.data) {
      setMemberInfo((prevInfo) => ({
        ...prevInfo,
        ...response.data,
      }));
    }
  };

  useEffect(() => {
    createEventSource();
    deleteEventSource();
    handleGetMemberInfo();
  }, [dispatch, token]);

  return (
    <nav className='bg-white shadow' role='navigation'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <NavbarButton name='TripPlannerz' onClick={moveToMain} />
          <NavbarButton name='여행 생성' onClick={moveToCreate} />
          <NavbarButton name='일정 조회' onClick={moveToSearch} />
          <NavbarButton name='여행 경비' onClick={moveToBill} />
          <NavbarInput
            value={searchTerm}
            placeholder='여행 일정을 검색하세요'
            onChange={handleChangeSearchTerm}
          />
          <NoticeDrawer
            onClick={openNoticeDrawer}
            onClose={closeNoticeDrawer}
            visible={noticeDrawerState}
            messages={notifications}
          />
          <UserInfoDrawer
            onClick={openUserInfoDrawer}
            onClose={closeUserInfoDrawer}
            visible={userInfoDrawerState}
            info={memberInfo}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
