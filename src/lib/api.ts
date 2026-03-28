const BASE_URL = "http://localhost:3000/api/v1";

// Auth endpoints that must never trigger the refresh/redirect flow
const SKIP_REFRESH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
];

let isRedirecting = false;

function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // Reset flag so future logins aren't permanently blocked
  isRedirecting = false;
}

async function attemptRefresh(): Promise<boolean> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return false;

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh}`,
      },
    });

    if (!res.ok) return false;

    const data = await res.json();
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}

function parseErrorMessage(data: any): string {
  if (!data?.message) return "";
  if (Array.isArray(data.message)) return data.message.join(", ");
  return data.message;
}

export async function api<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  const isSkippedEndpoint = SKIP_REFRESH_ENDPOINTS.some((e) =>
    endpoint.includes(e),
  );

  // Only attempt refresh for protected endpoints — never for login/register/refresh itself
  if (res.status === 401 && !isSkippedEndpoint) {
    const refreshed = await attemptRefresh();

    if (refreshed) {
      // Retry original request with the new access token
      headers["Authorization"] = `Bearer ${getToken()}`;
      res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    } else {
      clearTokens();

      if (window.location.pathname !== "/auth" && !isRedirecting) {
        isRedirecting = true;
        window.location.href = "/auth?error=expired";
      }

      throw new Error("Session expired. Please login again.");
    }
  }

  // Handle empty responses (e.g. DELETE, logout)
  if (res.status === 204) {
    return {} as T;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(parseErrorMessage(data) || `API Error ${res.status}`);
  }

  return data;
}
