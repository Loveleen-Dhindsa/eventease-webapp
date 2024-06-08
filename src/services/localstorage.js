const TOKEN_KEY = 'EVENTEASE_TOKEN';

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAccessToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  return localStorage.clear(TOKEN_KEY);
};

