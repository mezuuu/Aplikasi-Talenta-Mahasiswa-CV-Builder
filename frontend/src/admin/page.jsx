import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../assets/logo-Miaw-Family.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return <div></div>;
}
