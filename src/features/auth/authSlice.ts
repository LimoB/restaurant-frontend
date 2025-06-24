import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define User interface based on backend response
interface User {
  userId: number;         // Ensure this matches your backend
  name: string;
  email: string;
  user_type: string;      // "admin", "owner", etc.
}

// Define the overall auth state
interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Called on successful login
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    // Called on logout
    logout() {
      return initialState; // Clear state safely
    },

    // Optional: useful if restoring from localStorage
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
