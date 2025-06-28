const API_URL = "http://localhost:3000/api"; // or your env base

export interface Comment {
  id: number;
  issue_id: number;
  user_id: number;
  comment: string;
  created_at?: string;
}

// Fetch all comments
export const fetchComments = async (): Promise<Comment[]> => {
  const res = await fetch(`${API_URL}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return await res.json();
};

// Create a new comment
export const createComment = async (data: Omit<Comment, "id" | "created_at">) => {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create comment");
  return await res.json();
};

// Delete comment
export const deleteComment = async (id: number) => {
  const res = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
};
