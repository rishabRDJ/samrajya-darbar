import { ApiClient, apiClient } from "./api/api-client";
import type { ListUsersQuery, UpdateRoleDto } from "./api/api.types";

export class AdminUsersService {
  constructor(private readonly http: ApiClient = apiClient) {}

  list<T = unknown>(query: ListUsersQuery = {}): Promise<T> {
    return this.http.get<T>("/v1/admin/users", { auth: true, query: { ...query } });
  }

  setRole<T = unknown>(id: string, dto: UpdateRoleDto): Promise<T> {
    return this.http.patch<T>(`/v1/admin/users/${encodeURIComponent(id)}/role`, dto, {
      auth: true,
    });
  }

  softDelete(id: string): Promise<void> {
    return this.http.delete<void>(`/v1/admin/users/${encodeURIComponent(id)}`, { auth: true });
  }

  restore<T = unknown>(id: string): Promise<T> {
    return this.http.patch<T>(`/v1/admin/users/${encodeURIComponent(id)}/restore`, undefined, {
      auth: true,
    });
  }
}

export const adminUsersService = new AdminUsersService();
