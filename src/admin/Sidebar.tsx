// // src/admin/Sidebar.tsx
// import { Link, useLocation } from "react-router-dom";
// import { cn } from "../utils/cn"; // Utility function for class merging

// const links = [
//   { path: "/admin", label: "Dashboard" },
//   { path: "/admin/users", label: "Users" },
//   { path: "/admin/restaurants", label: "Restaurants" },
//   { path: "/admin/orders", label: "Orders" },
// ];

// function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="w-64 bg-white border-r p-6 min-h-screen">
//       <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
//       <nav className="space-y-4">
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={cn(
//               "block px-4 py-2 rounded hover:bg-blue-100",
//               location.pathname === link.path &&
//                 "bg-blue-500 text-white font-medium"
//             )}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;
