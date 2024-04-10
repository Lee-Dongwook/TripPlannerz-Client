import { EventSourcePolyfill } from 'event-source-polyfill';

export const getEventSource = (token: string) => {
  const response = new EventSourcePolyfill('http://localhost:8080/api/sub', {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
    heartbeatTimeout: 300000,
  });

  return response;
};
