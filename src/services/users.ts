export const fetchAllUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};
