export const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
  const res = await fetch(API_URL + path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}
