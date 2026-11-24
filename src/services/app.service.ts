import { ApiClient, apiClient } from "./api/api-client";

export class AppService {
  constructor(private readonly http: ApiClient = apiClient) {}

  hello<T = unknown>(): Promise<T> {
    return this.http.get<T>("/");
  }

  health<T = unknown>(): Promise<T> {
    return this.http.get<T>("/health");
  }
}

export const appService = new AppService();
