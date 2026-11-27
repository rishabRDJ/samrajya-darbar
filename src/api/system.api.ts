import { apiClient } from "@/lib/http/client";
import type { HealthResponse } from "@/types/system.types";

export const systemApi = {
  hello<T = unknown>(): Promise<T> {
    return apiClient.get<T>("/");
  },

  health(): Promise<HealthResponse> {
    return apiClient.get<HealthResponse>("/health");
  },
};
