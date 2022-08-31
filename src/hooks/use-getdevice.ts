import { UserDevice } from 'utils/types';

type getDeviceFunction = () => UserDevice;

const useGetDevice = (): getDeviceFunction => () => {
  const ua = navigator.userAgent;

  let device: UserDevice = 'desktop';
  if (
    ua.indexOf('iPhone') > 0 ||
    ua.indexOf('iPod') > 0 ||
    (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
  ) {
    device = 'mobile';
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    device = 'tablet';
  }

  return device;
};

export default useGetDevice;
