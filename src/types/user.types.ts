export type UserRole = "admin" | "user";

export interface UserProfile {
  id: string;
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  role: UserRole;
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string | null;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateRoleDto {
  role: UserRole;
}

export type UserStatusFilter = "active" | "deleted" | "all";

export interface ListUsersQuery {
  page?: number;
  limit?: number;
  q?: string;
  role?: UserRole;
  status?: UserStatusFilter;
}
