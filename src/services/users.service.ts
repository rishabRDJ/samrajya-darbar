import { ApiClient, apiClient } from "./api/api-client";
import type { ChangePasswordDto, UpdateMeDto, UserResponseDto } from "./api/api.types";

export class UsersService {
  constructor(private readonly http: ApiClient = apiClient) {}

  getMe(): Promise<UserResponseDto> {
    return this.http.get<UserResponseDto>("/users/me", { auth: true });
  }

  updateMe(dto: UpdateMeDto): Promise<UserResponseDto> {
    return this.http.patch<UserResponseDto>("/users/me", dto, { auth: true });
  }

  changePassword(dto: ChangePasswordDto): Promise<void> {
    return this.http.post<void>("/users/me/password", dto, { auth: true });
  }
}

export const usersService = new UsersService();
