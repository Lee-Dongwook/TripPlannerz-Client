import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';
import debounce from 'lodash/debounce';

import { Member } from '@/domain/Member';

import { getEventSource } from '@/application/api/navbar/getEventSource';
import { getMemberTripInfo } from '@/application/api/navbar/getMemberTripInfo';

import { setNotification } from '@/store/notification';

import { NavbarButton } from '@/ui/navbar/button/navbarButton';
import { NavbarInput } from '@/ui/navbar/input/navbarInput';
import { InnerMenu } from '@/ui/navbar/innerMenu/innerMenu';
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
  const [travelButtonState, setTravelButtonState] = useState<boolean>(true);
  const [noticeDrawerState, setNoticeDrawerState] = useState<boolean>(false);
  const [userInfoDrawerState, setUserInfoDrawerState] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [memberInfo, setMemberInfo] = useState<Member>({});

  const moveToMain = () => {
    navigate('/main');
  };

  const toggleTravelButtonState = () => {
    setTravelButtonState(!travelButtonState);
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
    <nav className='flex justify-between items-center bg-gray-200 p-4'>
      <div>
        <NavbarButton name='TripPlannerz' onClick={moveToMain} />
      </div>
      <div className='flex space-x-4'>
        <div>
          <NavbarButton name='여행 계획' onClick={toggleTravelButtonState} />
          {travelButtonState && <InnerMenu />}
        </div>
        <div>
          <NavbarInput
            value={searchTerm}
            placeholder='여행 일정을 검색하세요'
            onChange={handleChangeSearchTerm}
          />
        </div>
        <div>
          <NoticeDrawer
            onClick={openNoticeDrawer}
            onClose={closeNoticeDrawer}
            visible={noticeDrawerState}
            messages={notifications}
          />
        </div>
        <div>
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
