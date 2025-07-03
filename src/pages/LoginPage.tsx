import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/services/auth";
import { loginSuccess } from "@/features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);



  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser(formData);
      const userData = res.data;

      // ✅ Normalize user to match authSlice.User interface
      const normalizedUser = {
        id: userData.userId,           // backend returns userId, but we store it as id
        name: userData.name,
        email: userData.email,
        user_type: userData.user_type,
        address_id: userData.address_id,
      };

      // ✅ Store token + user in localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // ✅ Dispatch to Redux
      dispatch(loginSuccess({ token: userData.token, user: normalizedUser }));

      // ✅ Save remembered email if checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ✅ Role-based redirect
      switch (userData.user_type?.toLowerCase()) {
        case "member":
          navigate("/user");
          break;
        case "owner":
          navigate("/owner/dashboard");
          break;
        case "driver":
          navigate("/driver/dashboard");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/menu");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#442c1c]">Welcome Back</h2>
        <p className="text-sm text-center text-[#6b4c3b]">
          Enter your credentials to sign in
        </p>

        {error && (
          <div className="text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-3">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#5c4433]">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-[#442c1c] focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-[#5c4433]">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 text-[#442c1c] focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember Me / Forgot Password */}
        <div className="flex justify-between items-center text-sm text-[#6b4c3b]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-orange-600 border-gray-300 rounded"
            />
            Remember me
          </label>
          <Link to="/request-reset" className="text-orange-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-xl font-semibold transition-colors ${loading
            ? "bg-orange-300 cursor-not-allowed text-white"
            : "bg-[#6b3f1d] hover:bg-[#8b4e23] text-white"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-[#6b4c3b]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;



// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../services/auth";
// import { loginSuccess } from "../features/auth/authSlice";

// function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("rememberedEmail");
//     if (savedEmail) {
//       setFormData((prev) => ({ ...prev, email: savedEmail }));
//       setRememberMe(true);
//     }
//   }, []);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const res = await loginUser(formData);
//       const userData = res.data;

//       // ✅ Validate expected fields from API
//       const { token, id, name, email, user_type, address_id } = userData;

//       if (!token || !id || !user_type) {
//         throw new Error("Invalid login response from server.");
//       }

//       // ✅ Store token
//       localStorage.setItem("token", token);

//       // ✅ Update redux
//       dispatch(
//         loginSuccess({
//           token,
//           user: {
//             id,
//             name,
//             email,
//             user_type,
//             address_id,
//           },
//         })
//       );

//       // ✅ Remember email if needed
//       if (rememberMe) {
//         localStorage.setItem("rememberedEmail", email);
//       } else {
//         localStorage.removeItem("rememberedEmail");
//       }

//       // ✅ Role-based redirect
//       switch (user_type.toLowerCase()) {
//         case "member":
//           navigate("/user");
//           break;
//         case "owner":
//           navigate("/owner/dashboard");
//           break;
//         case "driver":
//           navigate("/driver/dashboard");
//           break;
//         case "admin":
//           navigate("/admin");
//           break;
//         default:
//           navigate("/menu");
//       }
//     } catch (err: any) {
//       setError(err?.response?.data?.error || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1740&q=80')",
//       }}
//     >
//       <div className="w-full max-w-md backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-200">
//         <h2 className="text-3xl font-bold text-center text-[#442c1c]">Welcome Back</h2>
//         <p className="text-sm text-center text-[#6b4c3b]">
//           Enter your credentials to sign in
//         </p>

//         {error && (
//           <div className="text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-3">
//             {error}
//           </div>
//         )}

//         {/* Email */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-[#5c4433]">Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             className="w-full border border-gray-300 rounded-xl px-4 py-2 text-[#442c1c] focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />
//         </div>

//         {/* Password */}
//         <div className="space-y-1 relative">
//           <label className="text-sm font-medium text-[#5c4433]">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="••••••••"
//             className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 text-[#442c1c] focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
//             aria-label="Toggle password visibility"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {/* Remember Me / Forgot Password */}
//         <div className="flex justify-between items-center text-sm text-[#6b4c3b]">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//               className="h-4 w-4 text-orange-600 border-gray-300 rounded"
//             />
//             Remember me
//           </label>
//           <Link to="/request-reset" className="text-orange-600 hover:underline">
//             Forgot password?
//           </Link>
//         </div>

//         {/* Login Button */}
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`w-full py-2 px-4 rounded-xl font-semibold transition-colors ${
//             loading
//               ? "bg-orange-300 cursor-not-allowed text-white"
//               : "bg-[#6b3f1d] hover:bg-[#8b4e23] text-white"
//           }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* Register Link */}
//         <p className="text-center text-sm text-[#6b4c3b]">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-orange-600 font-medium hover:underline">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
