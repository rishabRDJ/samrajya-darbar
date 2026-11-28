import { apiClient } from "@/lib/http/client";
import type { FyersLoginUrlResponse, FyersStatusResponse } from "@/types/fyers.types";

export const fyersApi = {
  getLoginUrl(): Promise<FyersLoginUrlResponse> {
    return apiClient.get<FyersLoginUrlResponse>("/v1/auth/fyers/login-url", { auth: true });
  },

  getStatus(): Promise<FyersStatusResponse> {
    return apiClient.get<FyersStatusResponse>("/v1/auth/fyers/status", { auth: true });
  },
};
