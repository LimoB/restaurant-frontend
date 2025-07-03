import client from "@/api/client";

export const registerUser = (data: {
    name: string;
    email: string;
    password: string;
    user_type?: string;
    contact_phone?: string;
}) => client.post("/auth/register", data);

export const verifyEmail = (code: string) =>
    client.post("/auth/verify-email", { verificationCode: code });

export const loginUser = (data: { email: string; password: string }) =>
    client.post("/auth/login", data);

export const requestPasswordReset = (email: string) =>
    client.post("/auth/request-reset", { email });

export const resetPassword = (data: {
    token: string;
    newPassword: string;
}) => client.post("/auth/reset-password", data);
