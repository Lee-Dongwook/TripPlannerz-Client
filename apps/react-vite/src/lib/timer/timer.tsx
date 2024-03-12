import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{currentTime}</div>;
};

export default Timer;
