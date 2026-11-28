import { apiClient } from "@/lib/http/client";
import type { ChangePasswordDto, UpdateProfileDto, UserProfile } from "@/types/user.types";

export const usersApi = {
  getMe(): Promise<UserProfile> {
    return apiClient.get<UserProfile>("/v1/users/me", { auth: true });
  },

  updateMe(dto: UpdateProfileDto): Promise<UserProfile> {
    return apiClient.patch<UserProfile>("/v1/users/me", dto, { auth: true });
  },

  changePassword(dto: ChangePasswordDto): Promise<void> {
    return apiClient.post<void>("/v1/users/me/password", dto, { auth: true });
  },
};
