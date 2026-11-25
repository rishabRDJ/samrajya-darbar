import { ApiClient, apiClient } from "./api/api-client";
import type { ChangePasswordDto, UpdateMeDto, UserResponseDto } from "./api/api.types";

export class UsersService {
  constructor(private readonly http: ApiClient = apiClient) {}

  getMe(): Promise<UserResponseDto> {
    return this.http.get<UserResponseDto>("/v1/users/me", { auth: true });
  }

  updateMe(dto: UpdateMeDto): Promise<UserResponseDto> {
    return this.http.patch<UserResponseDto>("/v1/users/me", dto, { auth: true });
  }

  changePassword(dto: ChangePasswordDto): Promise<void> {
    return this.http.post<void>("/v1/users/me/password", dto, { auth: true });
  }
}

export const usersService = new UsersService();
