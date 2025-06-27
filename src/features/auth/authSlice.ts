import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ✅ Define User interface based on backend schema
interface User {
  id: number;              // Must match backend (not userId)
  name: string;
  email: string;
  user_type: string;       // "admin", "owner", "driver", "member"
  address_id: number;      // Required for order delivery
}

// ✅ Define AuthState structure
interface AuthState {
  token: string | null;
  user: User | null;
}

// ✅ Initial state
const initialState: AuthState = {
  token: null,
  user: null,
};

// ✅ Create the slice
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
      return initialState;
    },

    // Restore from localStorage or external source
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

// ✅ Export actions and reducer
export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
