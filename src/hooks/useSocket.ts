import {SocketService} from '~services/Socket.service';

const useSocket = () => {
  const appSocket = new SocketService();

  return {appSocket};
};

export default useSocket;
