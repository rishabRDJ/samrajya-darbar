import { ApiClient, apiClient } from "./api/api-client";
import { tokenStorage, TokenStorage } from "./api/token-storage";
import type {
  AvailabilityResponseDto,
  LoginDto,
  RegisterDto,
  TokenResponseDto,
  UserResponseDto,
} from "./api/api.types";

export class AuthService {
  constructor(
    private readonly http: ApiClient = apiClient,
    private readonly tokens: TokenStorage = tokenStorage
  ) {}

  async login(dto: LoginDto): Promise<TokenResponseDto> {
    const res = await this.http.post<TokenResponseDto>("/v1/auth/login", dto);
    this.tokens.setTokens(res.accessToken, res.refreshToken);
    return res;
  }

  async register(dto: RegisterDto): Promise<UserResponseDto> {
    return this.http.post<UserResponseDto>("/v1/auth/register", dto);
  }

  async refresh(): Promise<TokenResponseDto | null> {
    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) return null;
    const res = await this.http.post<TokenResponseDto>("/v1/auth/refresh", { refreshToken });
    this.tokens.setTokens(res.accessToken, res.refreshToken);
    return res;
  }

  async logout(): Promise<void> {
    const refreshToken = this.tokens.getRefreshToken();
    try {
      if (refreshToken) {
        await this.http.post<void>("/v1/auth/logout", { refreshToken });
      }
    } finally {
      this.tokens.clear();
    }
  }

  checkUsername(username: string): Promise<AvailabilityResponseDto> {
    return this.http.get<AvailabilityResponseDto>("/v1/auth/availability", { query: { username } });
  }

  checkEmail(emailAddress: string): Promise<AvailabilityResponseDto> {
    return this.http.get<AvailabilityResponseDto>("/v1/auth/availability", {
      query: { emailAddress },
    });
  }

  isAuthenticated(): boolean {
    return this.tokens.getAccessToken() !== null;
  }
}

export const authService = new AuthService();
