import * as React from 'react';
import { io, Socket } from 'socket.io-client';

const sockets: { [id: string]: Socket } = {};

const useSocket = (channel: string): [Socket | undefined, () => void] => {
  const disconnect = React.useCallback(() => {
    if (sockets[channel]) {
      sockets[channel].disconnect();
      delete sockets[channel];
    }
  }, [channel]);

  // namespace: 게임 or 채팅 채널로 구분
  // room : 게임 방, 채팅 방 id
  if (channel !== 'game' && channel !== 'chat') {
    return [undefined, () => {}];
  }

  if (!sockets[channel]) {
    sockets[channel] = io(`${process.env.REACT_APP_SERVER}/${channel}`, { transports: ['websocket'] });
    console.log('create socket', channel, sockets[channel]);
  }

  return [sockets[channel], disconnect];
};

export default useSocket;
