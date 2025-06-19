import { jwtDecode } from "jwt-decode"; // ✅ Correct for v4

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp) return true;

    const currentTime = Date.now() / 1000; // seconds
    return exp < currentTime;
  } catch {
    return true;
  }
}
