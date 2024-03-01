import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Timer = () => {
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const [runningTime, setRunningTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);

  return <div>{runningTime}</div>;
};

export default Timer;
