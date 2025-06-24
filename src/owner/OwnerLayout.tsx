// owner/OwnerLayout.tsx
import { Outlet } from "react-router-dom";
export default function OwnerLayout() {
  return (
    <div>
      <h1 className="text-xl font-bold">Owner Dashboard</h1>
      <Outlet />
    </div>
  );
}
