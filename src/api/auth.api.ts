import { apiClient } from "@/lib/http/client";
import { tokenStorage } from "@/lib/auth/token-storage";
import type {
  AuthTokensResponse,
  AvailabilityResponse,
  LoginDto,
  RegisterDto,
} from "@/types/auth.types";
import type { UserProfile } from "@/types/user.types";

export const authApi = {
  async login(dto: LoginDto): Promise<AuthTokensResponse> {
    const res = await apiClient.post<AuthTokensResponse>("/v1/auth/login", dto);
    tokenStorage.setTokens(res.accessToken, res.refreshToken);
    return res;
  },

  register(dto: RegisterDto): Promise<UserProfile> {
    return apiClient.post<UserProfile>("/v1/auth/register", dto);
  },

  async refresh(): Promise<AuthTokensResponse | null> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) return null;
    const res = await apiClient.post<AuthTokensResponse>("/v1/auth/refresh", { refreshToken });
    tokenStorage.setTokens(res.accessToken, res.refreshToken);
    return res;
  },

  async logout(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) {
        await apiClient.post<void>("/v1/auth/logout", { refreshToken });
      }
    } finally {
      tokenStorage.clear();
    }
  },

  checkUsername(username: string): Promise<AvailabilityResponse> {
    return apiClient.get<AvailabilityResponse>("/v1/auth/availability", {
      query: { username },
    });
  },

  checkEmail(emailAddress: string): Promise<AvailabilityResponse> {
    return apiClient.get<AvailabilityResponse>("/v1/auth/availability", {
      query: { emailAddress },
    });
  },

  isAuthenticated(): boolean {
    return tokenStorage.getAccessToken() !== null;
  },
};
