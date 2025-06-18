export const fetchAllAddresses = async () => {
  const res = await fetch("http://localhost:3000/api/addresses");
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return await res.json();
};
