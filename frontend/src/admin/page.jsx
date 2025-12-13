import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../assets/logo-Miaw-Family.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen fixed top-0 left-0 z-50">
      <nav className="h-full flex flex-col bg-gray-900 border-r border-gray-700 shadow-xl">
        {/* Header dan Tombol Toggle */}
        <div
          className={`py-4 pr-2 pl-10 flex items-center text-white transition-all duration-300
    ${expanded ? "justify-between pl-12" : "justify-center pl-0"}
  `}
        >
          {expanded && (
            <span className="whitespace-nowrap transition-all duration-300 font-bold text-2xl pl-5">
              Miaw Family
            </span>
          )}

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors "
            aria-label={expanded ? "Tutup Sidebar" : "Buka Sidebar"}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>
        {/* Konten Menu Utama */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2 space-y-2">
            {/* Button 1 */}
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <FaBookReader size={20} />
                {expanded && (
                  <span className="whitespace-nowrap transition-all duration-300">
                    Dashboard
                  </span>
                )}
              </button>
            </li>

            {/* Button 2 */}
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <FiLogOut size={20} />
                {expanded && (
                  <span className="whitespace-nowrap transition-all duration-300">
                    Log out
                  </span>
                )}
              </button>
            </li>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
