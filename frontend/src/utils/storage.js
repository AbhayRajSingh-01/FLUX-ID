const TOKEN_KEY = 'flux_token';
const USER_KEY = 'flux_user';
const REMEMBER_KEY = 'flux_remember';

/**
 * Secure token storage — localStorage when "Remember Me", sessionStorage otherwise
 */
const getStore = () => {
  const remember = localStorage.getItem(REMEMBER_KEY) === 'true';
  return remember ? localStorage : sessionStorage;
};

export const setToken = (token, remember = false) => {
  localStorage.setItem(REMEMBER_KEY, String(remember));
  const store = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  store.setItem(TOKEN_KEY, token);
  other.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
};

export const setUser = (user, remember = false) => {
  const store = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  store.setItem(USER_KEY, JSON.stringify(user));
  other.removeItem(USER_KEY);
};

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const clearAuth = () => {
  removeToken();
  removeUser();
};
