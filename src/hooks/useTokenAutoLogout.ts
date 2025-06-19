// src/hooks/useTokenAutoLogout.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/checkTokenExpiry";

export function useTokenAutoLogout() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: { auth: any; }) => state.auth);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [token, dispatch]);
}
