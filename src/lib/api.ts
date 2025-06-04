const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
} as const;

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface AuthResponse {
  session: {
    access_token: string;
    refresh_token?: string;
  };
}

export async function api<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição");
  }

  return data;
}

export async function authApi(
  endpoint: string,
  options: RequestInit = {}
): Promise<AuthResponse> {
  return api<AuthResponse>(endpoint, options);
} 