const ACCESS_KEY = "darbar.accessToken";
const REFRESH_KEY = "darbar.refreshToken";
const AUTH_COOKIE = "darbar_auth";

const isBrowser = () => typeof window !== "undefined";

export class TokenStorage {
  getAccessToken(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(ACCESS_KEY);
    } catch {
      return null;
    }
  }

  getRefreshToken(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(REFRESH_KEY);
    } catch {
      return null;
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(ACCESS_KEY, accessToken);
      window.localStorage.setItem(REFRESH_KEY, refreshToken);
      document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=86400; samesite=lax`;
    } catch {
      // storage disabled — proceed without persistence
    }
  }

  clear(): void {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(ACCESS_KEY);
      window.localStorage.removeItem(REFRESH_KEY);
      document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`;
    } catch {
      // nothing to do
    }
  }
}

export const tokenStorage = new TokenStorage();
