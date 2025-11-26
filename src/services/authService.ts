import api from "./api";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token?: string | null;
};

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", { username, password });
  const data = res.data;
  if (data && data.success && data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem("token");
}

export default { login, getToken, isAuthenticated, logout };
