export interface FyersLoginUrlResponse {
  url: string;
}

export interface FyersStatusResponse {
  connected: boolean;
  expiresAt: string | null;
  connectedByUserId: string | null;
  updatedAt: string | null;
}
