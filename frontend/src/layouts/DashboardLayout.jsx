import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-[100] bg-black text-white p-2 rounded shadow-lg"
      >
        <Menu />
      </button>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-black h-full overflow-y-auto">
            <button onClick={() => setOpen(false)} className="text-white p-4">
              <X />
            </button>

            <Sidebar closeSidebar={() => setOpen(false)} />
          </div>

          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-72 p-4 pt-20 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}