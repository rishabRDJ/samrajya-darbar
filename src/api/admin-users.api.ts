import { apiClient } from "@/lib/http/client";
import type { ListUsersQuery, UpdateRoleDto } from "@/types/user.types";

export const adminUsersApi = {
  list<T = unknown>(query: ListUsersQuery = {}): Promise<T> {
    return apiClient.get<T>("/v1/admin/users", { auth: true, query: { ...query } });
  },

  setRole<T = unknown>(id: string, dto: UpdateRoleDto): Promise<T> {
    return apiClient.patch<T>(`/v1/admin/users/${encodeURIComponent(id)}/role`, dto, {
      auth: true,
    });
  },

  softDelete(id: string): Promise<void> {
    return apiClient.delete<void>(`/v1/admin/users/${encodeURIComponent(id)}`, { auth: true });
  },

  restore<T = unknown>(id: string): Promise<T> {
    return apiClient.patch<T>(`/v1/admin/users/${encodeURIComponent(id)}/restore`, undefined, {
      auth: true,
    });
  },
};
