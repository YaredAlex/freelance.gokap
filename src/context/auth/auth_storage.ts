import secureLocalStorage from "react-secure-storage";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh";

export function saveTokensToSecureStorage(token?: string, refresh?: string) {
  if (token) secureLocalStorage.setItem(TOKEN_KEY, token);
  if (refresh) secureLocalStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

export function getTokensFromSecureStorage() {
  const token = secureLocalStorage.getItem(TOKEN_KEY) as string | null;
  const refresh = secureLocalStorage.getItem(REFRESH_TOKEN_KEY) as string | null;
  return { token, refresh };
}

export function removeTokensFromSecureStorage() {
  secureLocalStorage.removeItem(TOKEN_KEY);
  secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
}
