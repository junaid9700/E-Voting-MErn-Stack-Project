import { useCookies } from 'react-cookie';

export const useHandleCookies = (cookieInitializer) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieInitializer]);
  const setCookieValue = (key, value, path) => {
    setCookie(key, value, { path: path });
  };
  const removeCookieValue = (key) => {
    removeCookie(key);
  };
  const getCookieValue = (key) => {
    return cookies[key];
  };
  return { setCookieValue, removeCookieValue, getCookieValue };
};
