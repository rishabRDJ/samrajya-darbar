// Mirrors the Dwarpal OpenAPI schemas (samrajya-dwarpal/docs/openapi.yml).
// Keep this file in sync when the API contract changes.

export type Role = "admin" | "user";

export interface UserResponseDto {
  id: string;
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  role: Role;
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface TokenResponseDto {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface RegisterDto {
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
}

export interface UpdateMeDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string | null;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface AvailabilityResponseDto {
  available: boolean;
}

export interface UpdateRoleDto {
  role: Role;
}

export type UserStatusFilter = "active" | "deleted" | "all";

export interface ListUsersQuery {
  page?: number;
  limit?: number;
  q?: string;
  role?: Role;
  status?: UserStatusFilter;
}

export interface ConflictErrorBody {
  conflictField?: "username" | "emailAddress" | "phoneNumber";
  [key: string]: unknown;
}
