export interface LoginDto {
  identifier: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthTokensResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface AvailabilityResponse {
  available: boolean;
}

export interface ConflictErrorBody {
  conflictField?: "username" | "emailAddress" | "phoneNumber";
  [key: string]: unknown;
}
