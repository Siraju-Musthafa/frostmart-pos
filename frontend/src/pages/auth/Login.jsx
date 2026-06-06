// import { useState } from "react";
// import api from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom"

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await api.post(
//         "/auth/login",
//         formData
//       );

//       localStorage.setItem(
//         "token",
//         response.data.data.token
//       );

//       toast.success("Login successful");

//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="
//           bg-white
//           p-6 md:p-8
//           rounded-xl
//           shadow-lg
//           w-full
//           max-w-md
//         "
//       >
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//           Login
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="
//             w-full
//             border
//             p-3
//             mb-4
//             rounded
//             text-sm
//             md:text-base
//           "
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="
//             w-full
//             border
//             p-3
//             mb-4
//             rounded
//             text-sm
//             md:text-base
//           "
//         />

//         <button
//           className="
//             w-full
//             bg-black
//             text-white
//             p-3
//             rounded
//             hover:bg-gray-800
//             transition
//           "
//         >
//           Login
//         </button>
//         <p className="text-center mt-4">
//         Don't have an account?
//         <Link to="/register" className="text-blue-600 ml-2">
//           Register
//         </Link>
//       </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#080c14", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left panel – blue ice brand ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-between p-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0a1628 0%, #0d2347 40%, #0e3a6e 100%)",
        }}
      >
        {/* Decorative ice circles */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,182,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "60px", left: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,182,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Snowflake dots */}
        {[
          { top: "18%", left: "12%", size: 6, op: 0.25 },
          { top: "35%", left: "78%", size: 4, op: 0.18 },
          { top: "60%", left: "20%", size: 8, op: 0.15 },
          { top: "75%", left: "65%", size: 5, op: 0.2 },
          { top: "50%", left: "50%", size: 3, op: 0.12 },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: s.top, left: s.left,
            width: s.size, height: s.size, borderRadius: "50%",
            background: `rgba(147,210,255,${s.op})`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <FrostLogo size={44} />
          <span className="font-black text-2xl tracking-tight" style={{ color: "#e8f4ff" }}>
            SnowFreez
          </span>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-6xl">🧊</span>
          </div>
          <h1 className="font-black text-5xl leading-tight mb-5" style={{ color: "#e8f4ff" }}>
            Fresh frozen.<br />
            <span style={{ color: "#38b6ff" }}>Always stocked.</span>
          </h1>
          <p className="text-lg" style={{ color: "rgba(180,215,255,0.65)" }}>
            Manage your frozen goods store<br />with clarity and speed.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 relative z-10">
          {[
            { val: "10k+", label: "Products" },
            { val: "99.9%", label: "Uptime" },
            { val: "24/7", label: "Support" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-black text-xl" style={{ color: "#38b6ff" }}>{s.val}</div>
              <div className="text-sm" style={{ color: "rgba(180,215,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel – dark form ── */}
      <div
        className="flex-1 flex flex-col justify-center items-center px-8 py-16"
        style={{ background: "#080c14" }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <FrostLogo size={34} />
            <span className="font-black text-xl" style={{ color: "#e8f4ff" }}>SnowFreez</span>
          </div>

          <h2 className="font-black text-3xl mb-1" style={{ color: "#e8f4ff" }}>
            Welcome back
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#4a6080" }}>
            Sign in to your SnowFreez account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#38b6ff" }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
                style={{ background: "#0d1a2e", border: "1px solid #1a2e4a", caretColor: "#38b6ff" }}
                onFocus={e => {
                  e.target.style.borderColor = "#38b6ff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(56,182,255,0.12)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#1a2e4a";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#38b6ff" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
                style={{ background: "#0d1a2e", border: "1px solid #1a2e4a", caretColor: "#38b6ff" }}
                onFocus={e => {
                  e.target.style.borderColor = "#38b6ff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(56,182,255,0.12)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#1a2e4a";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs" style={{ color: "#38b6ff" }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm tracking-wide transition-all"
              style={{
                background: "linear-gradient(135deg, #1565c0 0%, #38b6ff 100%)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(56,182,255,0.25)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 28px rgba(56,182,255,0.45)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(56,182,255,0.25)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sign In →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            {/* <div className="flex-1 h-px" style={{ background: "#0d1a2e" }} />
            <span className="mx-4 text-xs" style={{ color: "#1a2e4a" }}>OR CONTINUE WITH</span> */}
            <div className="flex-1 h-px" style={{ background: "#0d1a2e" }} />
          </div>

          {/* Social buttons */}
          {/* {[
            { label: "Continue with phone", icon: "📱" },
            { label: "Continue with Google", icon: "G" },
            { label: "Continue with Facebook", icon: "f" },
          ].map((btn) => (
            <button
              key={btn.label}
              className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold mb-3 transition-all"
              style={{ border: "1px solid #1a2e4a", color: "#8aafd4", background: "transparent" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#38b6ff";
                e.currentTarget.style.color = "#e8f4ff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#1a2e4a";
                e.currentTarget.style.color = "#8aafd4";
              }}
            >
              <span className="w-6 text-center mr-3">{btn.icon}</span>
              {btn.label}
            </button>
          ))} */}

          <p className="text-center mt-8 text-sm" style={{ color: "#2d4a6a" }}>
            Don't have an account?{" "}
            <Link to="/register" className="font-bold" style={{ color: "#38b6ff" }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Ice crystal / snowflake logo ── */
function FrostLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="23" fill="#0d2347" stroke="#38b6ff" strokeWidth="1.5" />
      {/* Snowflake arms */}
      <line x1="24" y1="8" x2="24" y2="40" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12.7" y1="12.7" x2="35.3" y2="35.3" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="35.3" y1="12.7" x2="12.7" y2="35.3" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      {/* Branch tips on vertical */}
      <line x1="24" y1="8" x2="20" y2="13" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="8" x2="28" y2="13" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="40" x2="20" y2="35" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="40" x2="28" y2="35" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      {/* Branch tips on horizontal */}
      <line x1="8" y1="24" x2="13" y2="20" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="24" x2="13" y2="28" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40" y1="24" x2="35" y2="20" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40" y1="24" x2="35" y2="28" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="3.5" fill="#38b6ff" />
      <circle cx="24" cy="24" r="1.8" fill="#0d2347" />
    </svg>
  );
}