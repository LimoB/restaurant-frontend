// services/state.ts
import client from "../api/client"; // ✅ Ensure this points to your axios/HTTP client

// ✅ Types
export interface StateInput {
  name: string;
  code: string;
}

export interface State {
  id: number;
  name: string;
  code: string;
}

// ✅ Fetch all states
export async function fetchStates(): Promise<State[]> {
  const res = await client.get("/states");
  return res.data;
}

// ✅ Fetch a single state (if needed)
export async function fetchStateById(id: number): Promise<State> {
  const res = await client.get(`/states/${id}`);
  return res.data;
}

// ✅ Create a new state
export async function createState(data: StateInput): Promise<State> {
  const res = await client.post("/states", data);
  return res.data;
}

// ✅ Update an existing state
export async function updateState(id: number, data: StateInput): Promise<State> {
  const res = await client.put(`/states/${id}`, data);
  return res.data;
}

// ✅ Delete a state
export async function deleteState(id: number): Promise<void> {
  await client.delete(`/states/${id}`);
}
