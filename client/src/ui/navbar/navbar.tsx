import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { Member } from '@/domain/Member';

import { getEventSoruce } from '@/application/api/navbar/getEventSource';
import { getMemberTripInfo } from '@/application/api/navbar/getMemberTripInfo';
import { searchTripInTripList } from '@/application/navbar/searchTripInTripList';

import { addNotification } from '@/store/action/notificationAction';

import styles from '@/ui/navbar/navbar.module.css';
import { NavbarButton } from '@/ui/navbar/button/navbarButton';
import { NavbarInput } from '@/ui/navbar/input/navbarInput';
import { InnerMenu } from '@/ui/navbar/innerMenu/innerMenu';
import { NoticeDrawer } from '@/ui/navbar/drawer/noticeDrawer';
import { UserInfoDrawer } from '@/ui/navbar/drawer/userInfoDrawer';




function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token: string = useSelector((state: any) => state.token.token);
    const notifications: string[] = useSelector((state: any) => state.notification.notifications || []);

    const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);
    const [travelButtonState, setTravelButtonState] = useState<boolean>(false);
    const [noticeDrawerState, setNoticeDrawerState] = useState<boolean>(false);
    const [userInfoDrawerState, setUserInfoDrawerState] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [memberInfo, setMemberInfo] = useState<Member>({})

    const moveToMain = () => {
      navigate('/main');
    }

    const toggleTravelButtonState = () => {
      setTravelButtonState(!travelButtonState);
    }
    
    const handleChangeSearchTerm = (event) => {
      setSearchTerm(event.target.value);
    }

    const openNoticeDrawer = () => {
      setNoticeDrawerState(true);
    }

    const closeNoticeDrawer = () => {
      setNoticeDrawerState(false);
    }

    const openUserInfoDrawer = () => {
      setUserInfoDrawerState(true);
    }

    const closeUserInfoDrawer = () => {
      setUserInfoDrawerState(false);
    }

    const createEventSource = () => {    
      const eventSource = getEventSoruce(token);

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const notificationString = `${message.senderName}님이 \n ${message.review.slice(0,4)}..를 입력하였습니다. \n ${message.postDate}`;
        dispatch(addNotification(notificationString));
      }

      eventSource.onclose = () => {

      }

      setEventSource(eventSource);
    }

    const deleteEventSource = () => {
      if(eventSource){
        eventSource.close();
        setEventSource(null);
      }
    }

    const handleGetMemberInfo = async() => {
      const response = await getMemberTripInfo(token);
      if(response.data){
        setMemberInfo((prevInfo) => ({
          ...prevInfo,
          ...response.data
        }))
      }
    }

    useEffect(() => {
      createEventSource();
      deleteEventSource();
      handleGetMemberInfo();
    },[dispatch, token])


    return(
        <Menu mode="horizontal" theme="light" className={styles.navbarContainer}>
        <Menu.Item><NavbarButton name='TripPlannerz' style={{width: '200px'}} onClick={moveToMain} /></Menu.Item>
        <Menu.Item>
          <NavbarButton name='여행 계획' style={{width: '200px'}} onClick={toggleTravelButtonState} />
          {travelButtonState && <InnerMenu /> }
        </Menu.Item>
        <Menu.Item>
          <NavbarInput 
            style={{width: '400px', textAlign: 'center'}} 
            value={searchTerm} 
            placeholder = "여행 일정을 검색하세요"
            onChange={handleChangeSearchTerm}
            onKeyDown={(event) => searchTripInTripList(navigate, event, searchTerm)}
          />
        </Menu.Item>
        <Menu.Item>
          <NoticeDrawer 
            onClick={openNoticeDrawer}
            onClose={closeNoticeDrawer}
            visible={noticeDrawerState}
            messages={notifications} />
        </Menu.Item>
        <Menu.Item>
          <UserInfoDrawer
            onClick={openUserInfoDrawer}
            onClose={closeUserInfoDrawer}
            visible={userInfoDrawerState}
            info={memberInfo} />
        </Menu.Item>
      </Menu>
    )
}

export default Navbar