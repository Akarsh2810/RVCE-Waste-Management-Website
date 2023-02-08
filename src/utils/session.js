export const getSessionToken = (key) => sessionStorage.getItem(key);

export const setSessionToken = (key, value) =>
  sessionStorage.setItem(key, value);

export const removeSessionToken = (key) => sessionStorage.removeItem(key);

export const getUserMailId = (key) => sessionStorage.getItem(key);

export const setUserMailId = (key, value) =>
  sessionStorage.setItem(key, value);

export const removeUserMailId = (key) => sessionStorage.removeItem(key);
