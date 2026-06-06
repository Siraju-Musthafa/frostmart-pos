// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   ShoppingCart,
//   Truck,
//   ClipboardList,
//   Tags,
//   BarChart3,
//   BookOpen,
// } from "lucide-react";

// import { Link } from "react-router-dom"

// export default function Sidebar({closeSidebar}) {
//   return (
//     <div className="w-72  bg-black text-white p-5  h-screen ">
//       <h1 className="text-2xl font-bold mb-10">FrostMart POS</h1>

//       <div className="space-y-4">
//         <Link
//           to="/dashboard"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <LayoutDashboard size={20} />
//           Dashboard
//         </Link>

//         <Link
//           to="/products"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <Package size={20} />
//           Products
//         </Link>

//         <Link
//           to="/categories"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <Tags size={20} />
//           Categories
//         </Link>
//         <Link
//           to="/customers"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <Users size={20} />
//           Customers
//         </Link>

//         <Link
//           to="/billing"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <ShoppingCart size={20} />
//           Billing
//         </Link>

//         <Link
//           to="/sales"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <BarChart3 size={20} />
//           Sales
//         </Link>

//         <Link
//           to="/ledger"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <BookOpen size={20} />
//           Ledger
//         </Link>

//         <Link
//           to="/suppliers"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <Truck size={20} />
//           Suppliers
//         </Link>

//         <Link
//           to="/purchases"
//           onClick={closeSidebar}
//           className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           <ClipboardList size={20} />
//           Purchases
//         </Link>
//       </div>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           window.location.href = "/";
//         }}
//         className="mt-10 bg-red-500 px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Truck,
  ClipboardList,
  Tags,
  BarChart3,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function FrostLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#0d2347" stroke="#38b6ff" strokeWidth="1.5" />
      <line x1="24" y1="8"    x2="24" y2="40"   stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8"  y1="24"   x2="40" y2="24"   stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12.7" y1="12.7" x2="35.3" y2="35.3" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="35.3" y1="12.7" x2="12.7" y2="35.3" stroke="#38b6ff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="24" y1="8"  x2="20" y2="13" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="8"  x2="28" y2="13" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="40" x2="20" y2="35" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="40" x2="28" y2="35" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8"  y1="24" x2="13" y2="20" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8"  y1="24" x2="13" y2="28" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40" y1="24" x2="35" y2="20" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40" y1="24" x2="35" y2="28" stroke="#38b6ff" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.5" fill="#38b6ff" />
      <circle cx="24" cy="24" r="1.8" fill="#0d2347" />
    </svg>
  );
}

const navItems = [
  { to: "/dashboard",  icon: LayoutDashboard, label: "Dashboard"  },
  { to: "/products",   icon: Package,         label: "Products"   },
  { to: "/categories", icon: Tags,            label: "Categories" },
  { to: "/customers",  icon: Users,           label: "Customers"  },
  { to: "/billing",    icon: ShoppingCart,    label: "Billing"    },
  { to: "/sales",      icon: BarChart3,       label: "Sales"      },
  { to: "/ledger",     icon: BookOpen,        label: "Ledger"     },
  { to: "/suppliers",  icon: Truck,           label: "Suppliers"  },
  { to: "/purchases",  icon: ClipboardList,   label: "Purchases"  },
];

export default function Sidebar({ closeSidebar }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className="w-64 h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080c14 0%, #0a1220 60%, #080c14 100%)",
        borderRight: "1px solid #1a2e4a",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Glow orb top */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,182,255,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Glow orb bottom */}
      <div style={{
        position: "absolute", bottom: "-40px", left: "-40px",
        width: "160px", height: "160px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,182,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Brand header ── */}
      <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: "1px solid #1a2e4a" }}>
        <FrostLogo size={36} />
        <div>
          <p className="font-black text-base leading-tight" style={{ color: "#e8f4ff" }}>SnowFreez</p>
          <p className="text-xs font-medium" style={{ color: "#38b6ff" }}>Managing System</p>
        </div>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest px-3 mb-3" style={{ color: "#2d4a6a" }}>
          Main Menu
        </p>

        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold relative"
              style={{
                color: active ? "#e8f4ff" : "#4a6a8a",
                background: active
                  ? "linear-gradient(135deg, rgba(21,101,192,0.35) 0%, rgba(56,182,255,0.15) 100%)"
                  : "transparent",
                borderLeft: active ? "3px solid #38b6ff" : "3px solid transparent",
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(56,182,255,0.07)";
                  e.currentTarget.style.color = "#b0d4f0";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#4a6a8a";
                }
              }}
            >
              <Icon
                size={18}
                style={{ color: active ? "#38b6ff" : "inherit", flexShrink: 0 }}
              />
              {label}
              {active && (
                <div style={{
                  marginLeft: "auto",
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#38b6ff",
                  boxShadow: "0 0 6px #38b6ff",
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid #1a2e4a" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ color: "#e05c5c", background: "transparent", border: "1px solid #2a1a1a" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(224,92,92,0.1)";
            e.currentTarget.style.borderColor = "#e05c5c";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#2a1a1a";
          }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          Logout
        </button>
      </div>
    </div>
  );
}