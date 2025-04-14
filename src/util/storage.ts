
const USER_INFO_KEY = '@f.info';

export const saveUserInfo = (data: object) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
};

export const readUserInfo = <T>(): T | null => {
  const data = localStorage.getItem(USER_INFO_KEY);
  return data ? JSON.parse(data) as T : null;
};

export const deleteUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
